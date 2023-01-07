"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationsToResponse = exports.conversationToResponse = void 0;
function conversationToResponse(conversation) {
  return {
    members: conversation.members,
    chat: conversation.chat,
    _id: conversation._id,
    seen: conversation.seen ? conversation.seen : [],
  };
}
exports.conversationToResponse = conversationToResponse;
function conversationsToResponse(conversations) {
  const response = [];
  conversations.forEach((value) => {
    response.push(conversationToResponse(value));
  });
  return response;
}
exports.conversationsToResponse = conversationsToResponse;
