import { ObjectId } from "bson";
import {Message} from "./Message";

export default interface Conversation {
  _id?: ObjectId;
  members : string[];
  chat : Message[];
}

