import { ObjectId } from "bson";
import { UserFactory } from "./UserFactory";

export interface Comment {
  id?: ObjectId;
  author: UserFactory;
  content: string;
  date: string;
}
