import { ObjectId } from "bson";
import { Message } from "./Message";
import { UserFactory } from "./UserFactory";

export default interface Conversation {
  _id?: ObjectId;
  members: string[];
  membersInfos: UserFactory[];
  chat: Message[];
  seen: string[];
}
