import { ObjectId } from "bson";

export interface Comment {
  id?: ObjectId;
  author: string;
  content: string;
  date: string;
}
