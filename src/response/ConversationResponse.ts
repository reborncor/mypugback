import { ObjectId } from "bson";
import Conversation from "../models/Conversation";
import { Message } from "../models/Message";

export default interface ConversationResponse {
  _id?: ObjectId;
  members: string[];
  chat: Message[];
  seen: string[];
}

export function conversationToResponse(
  conversation: Conversation
): ConversationResponse {
  return {
    members: conversation.members,
    chat: conversation.chat,
    _id: conversation._id,
    seen: conversation.seen ? conversation.seen : [],
  };
}

export function conversationsToResponse(
  conversations: Conversation[]
): ConversationResponse[] {
  const response: ConversationResponse[] = [];
  conversations.forEach((value) => {
    response.push(conversationToResponse(value));
  });
  return response;
}
