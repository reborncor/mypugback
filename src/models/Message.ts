import { ObjectId } from "bson";
import { PugResponse } from "../response/PugResponse";

export interface Message {
  _id?: ObjectId;
  senderUsername: string;
  receiverUsername: string;
  time: string;
  content: string | PugResponse;
  type: "text" | "pug";
}
