import { Message } from "../models/Message";
import { ObjectId } from "bson";

export default interface MessageResponse extends Message {
  id?: ObjectId;
}

export function messageToResponse(message: Message): MessageResponse {
  return {
    id: message._id,
    content: message.content,
    senderUsername: message.senderUsername,
    receiverUsername: message.receiverUsername,
    time: message.time,
    type: message.type,
  };
}
