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
exports.getConversationPageable = void 0;
const UserRepository_1 = __importDefault(require("../../repository/UserRepository"));
const checkdata_1 = require("../../util/validator/checkdata");
const ConversationRepository_1 = __importDefault(require("../../repository/ConversationRepository"));
const tokenManagement_1 = require("../../util/security/tokenManagement");
const util_1 = require("../../util/util");
const CustomError_1 = require("../../util/error/CustomError");
const getConversationPageable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    try {
        const { userId } = (0, tokenManagement_1.decodeToken)(token);
        const { username, startInd, endInd } = req.query;
        const oldmessages = yield execute(userId, username, parseInt(startInd), parseInt(endInd));
        res.status(200).json({ code: util_1.successCode, message: "Anciens messages : ", payload: { oldmessages: oldmessages } });
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
exports.getConversationPageable = getConversationPageable;
const execute = (userId, receiverUsername, startInd, endInd) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findById(userId);
    const receiverUser = yield UserRepository_1.default.findByUsername(receiverUsername);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    (0, checkdata_1.checkThatUserExistsOrThrow)(receiverUser);
    const result = yield ConversationRepository_1.default.findByMembersPageable([currentUser.username, receiverUser.username], startInd, endInd);
    result.chat.reverse();
    return result.chat;
});
