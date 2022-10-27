"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationToResponse = void 0;
function conversationToResponse(conversation) {
    return {
        members: conversation.members,
        chat: conversation.chat,
        _id: conversation._id,
        seen: conversation.seen,
    };
}
exports.conversationToResponse = conversationToResponse;
