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
exports.getConversationFromId = void 0;
const checkdata_1 = require("../../util/validator/checkdata");
const ConversationRepository_1 = __importDefault(require("../../repository/ConversationRepository"));
const getConversationFromId = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    const conversation = yield ConversationRepository_1.default.findById(conversationId);
    (0, checkdata_1.checkThatConversationExist)(conversation);
    conversation.chat.reverse();
    return { code: 0, payload: conversation, message: "Conversation exist. Sending messages..." };
});
exports.getConversationFromId = getConversationFromId;
