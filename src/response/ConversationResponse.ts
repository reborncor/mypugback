import {ObjectId} from "bson";
import Conversation from "../models/Conversation";
import {Message} from "../models/Message";


export default interface ConversationResponse {
  _id?: ObjectId;
  members : string[];
  chat : Message[];
}

export function conversationToResponse(conversation : Conversation): ConversationResponse{

  return {
    members : conversation.members,
    chat : conversation.chat,
    _id: conversation._id
  }
}
