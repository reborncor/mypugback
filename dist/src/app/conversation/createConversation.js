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
exports.createConversation = void 0;
const UserRepository_1 = __importDefault(require("../../repository/UserRepository"));
const checkdata_1 = require("../../util/validator/checkdata");
const ConversationRepository_1 = __importDefault(require("../../repository/ConversationRepository"));
const tokenManagement_1 = require("../../util/security/tokenManagement");
const util_1 = require("../../util/util");
const CustomError_1 = require("../../util/error/CustomError");
const ConversationResponse_1 = require("../../response/ConversationResponse");
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    try {
        const { userId } = (0, tokenManagement_1.decodeToken)(token);
        const { username } = req.body;
        const { conversation, exist } = yield execute(userId, username);
        const message = exist ? "Already Exist, sending data.." : "created";
        res.status(200).json({ code: util_1.successCode, message: "Conversation : " + message, payload: conversation });
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
exports.createConversation = createConversation;
const execute = (userId, receiverUsername) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findById(userId);
    const receiverUser = yield UserRepository_1.default.findByUsername(receiverUsername);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    (0, checkdata_1.checkThatUserExistsOrThrow)(receiverUser);
    (0, checkdata_1.checkThatUserIsNotLucieOrThrow)(receiverUser);
    const result = yield ConversationRepository_1.default.findByMembers([currentUser.username, receiverUser.username]);
    if (result) {
        let conversation = (0, ConversationResponse_1.conversationToResponse)(result);
        // conversation.chat.reverse();
        return { conversation, exist: true };
    }
    else {
        const newConversation = { members: [currentUser.username, receiverUser.username], chat: [], seen: [currentUser.username] };
        yield ConversationRepository_1.default.insert(newConversation);
        return { conversation: newConversation, exist: false };
    }
});
