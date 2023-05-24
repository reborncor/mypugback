import { ObjectId } from "bson";

export interface Participant {
  _id?: ObjectId;
  date: number;
  pugId: ObjectId;
  userId: ObjectId;
  username: String;
  sex: "man" | "woman";
}
