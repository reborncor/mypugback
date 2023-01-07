"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageToResponse = void 0;
function messageToResponse(message) {
  return {
    id: message._id,
    content: message.content,
    senderUsername: message.senderUsername,
    receiverUsername: message.receiverUsername,
    time: message.time,
  };
}
exports.messageToResponse = messageToResponse;
