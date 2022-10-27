"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPug = void 0;
const checkdata_1 = require("../../../util/validator/checkdata");
const moment_1 = __importDefault(require("moment"));
const UserRepository_1 = __importDefault(require("../../../repository/UserRepository"));
const CustomError_1 = require("../../../util/error/CustomError");
const tokenManagement_1 = require("../../../util/security/tokenManagement");
const PugRepository_1 = __importDefault(require("../../../repository/PugRepository"));
const bson_1 = require("bson");
const fs = require('fs').promises;
const { promisify } = require('util');
const addPug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        const { imageDescription, details, isCrop, height } = req.body;
        const { userId } = (0, tokenManagement_1.decodeToken)(token);
        const result = yield execute(userId, (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename, (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype, imageDescription, details, isCrop, height);
        res.status(201).json({ code: result.code, message: result.message, payload: result.payload });
    }
    catch (err) {
        if (err instanceof CustomError_1.CustomError) {
            console.log(err);
            res.status(400).json({ message: err.message, code: err.code });
        }
        else {
            console.log(err);
        }
    }
});
exports.addPug = addPug;
const unlinkAsync = promisify(fs.unlink);
const execute = (userId, path, format, imageDescription, details, isCrop, height) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findById(userId);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    console.log("PATH", path);
    // const contents = await fs.readFile(path, {encoding: 'base64'});
    if (details) {
        details.forEach(value => { value.positionX = parseFloat(value.positionX.toString()); value.positionY = parseFloat((value.positionY.toString())); });
    }
    const date = (0, moment_1.default)().unix();
    const newPug = {
        comments: [],
        id: new bson_1.ObjectId(),
        usersLike: [],
        date: date,
        imageData: "", imageFormat: format ? format : "",
        isCrop: isCrop ? true : false,
        height: height,
        details: details ? details : [], imageDescription, imageTitle: "", imageURL: path ? path : "", like: 0
    };
    console.log(newPug);
    yield PugRepository_1.default.addNewPug(currentUser, newPug);
    yield UserRepository_1.default.updateUserPug(currentUser, 1);
    return {
        code: 0, message: "Nouveau pug ajouté avec succès",
    };
});
