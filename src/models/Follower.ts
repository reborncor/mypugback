import {ObjectId} from "bson";

export interface Follower {
    _id: ObjectId;
    username : string;
}