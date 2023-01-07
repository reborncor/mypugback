import { ObjectId } from "bson";
import { Message } from "../models/Message";

export default interface MessageResponse {
  id?: ObjectId;
  senderUsername: string;
  receiverUsername: string;
  content: string;
  time: string;
}

export function messageToResponse(message: Message): MessageResponse {
  return {
    id: message._id,
    content: message.content,
    senderUsername: message.senderUsername,
    receiverUsername: message.receiverUsername,
    time: message.time,
  };
}
