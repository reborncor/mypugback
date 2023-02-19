import { ObjectId } from "bson";
import {Pug} from "./Pug";

export interface Message {
  _id?: ObjectId;
  senderUsername: string;
  receiverUsername: string;
  time: string;
  content: string | Pug;
}
