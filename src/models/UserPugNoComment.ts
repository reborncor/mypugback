import { ObjectId } from "bson";
import { Pug } from "./Pug";

export interface UserPugNoComment {
  _id: string;
  numberOfComments: number;
  pug: Pug;
}
