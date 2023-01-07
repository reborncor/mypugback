import { ObjectId } from "bson";
import { Follower } from "./Follower";

export interface FollowingFollowerModel {
  _id?: ObjectId;
  username: string;
  followers: Follower[];
  following: Follower[];
}
