import { ObjectId } from "bson";

export interface Message {
  _id?: ObjectId;
  senderUsername: string;
  receiverUsername: string;
  time: string;
  content: string;
}
