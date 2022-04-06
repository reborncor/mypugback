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
const UserRepository_1 = __importDefault(require("../../../repository/UserRepository"));
const CustomError_1 = require("../../../util/error/CustomError");
const tokenManagement_1 = require("../../../util/security/tokenManagement");
const PugRepository_1 = __importDefault(require("../../../repository/PugRepository"));
const fs = require('fs').promises;
const addPug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        const { imageTitle, imageDescription, details } = req.body;
        const { userId } = (0, tokenManagement_1.decodeToken)(token);
        console.log("FICHIER : ", req.file);
        const result = yield execute(userId, (_b = req.file) === null || _b === void 0 ? void 0 : _b.path, (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype, imageTitle, imageDescription, details);
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
const execute = (userId, path, format, imageDescription, imageTitle, details) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findById(userId);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    console.log("PATH", path);
    const contents = yield fs.readFile(path, { encoding: 'base64' });
    console.log(contents.length);
    const newPug = {
        imageData: contents, imageFormat: format ? format : "",
        details: details, imageDescription, imageTitle, imageURL: path ? path : "", like: 0
    };
    yield PugRepository_1.default.addNewPug(currentUser, newPug);
    return {
        code: 0, message: "Nouveau pug ajouté avec succès",
    };
});
