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
exports.seenConversation = void 0;
const CustomError_1 = require("../../util/error/CustomError");
const UserRepository_1 = __importDefault(require("../../repository/UserRepository"));
const checkdata_1 = require("../../util/validator/checkdata");
const ConversationRepository_1 = __importDefault(require("../../repository/ConversationRepository"));
const util_1 = require("../../util/util");
const seenConversation = (currentUsername, conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield execute(currentUsername, conversationId);
        return { message, code: util_1.successCode };
    }
    catch (err) {
        if (err instanceof CustomError_1.CustomError) {
            console.log(err);
            return ({ message: err.message, code: err.code });
        }
        else {
            console.log(err);
        }
    }
});
exports.seenConversation = seenConversation;
const execute = (currentUsername, conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findByUsername(currentUsername);
    const conversation = yield ConversationRepository_1.default.findById(conversationId);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    (0, checkdata_1.checkThatConversationExist)(conversation);
    yield ConversationRepository_1.default.updateConversationOnSeen(conversation, currentUser);
    return "Conversation vu";
});
