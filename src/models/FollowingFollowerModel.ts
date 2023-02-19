import { ObjectId } from "bson";
import { UserFactory } from "./UserFactory";

export interface FollowingFollowerModel {
  _id?: ObjectId;
  username: string;
  followers: UserFactory[];
  following: UserFactory[];
  blocked: UserFactory[];
}
