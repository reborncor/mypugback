import { ObjectId } from "bson";

export interface UserFactory {
  _id?: ObjectId;
  username: string;
  profilePicture: string;
}
