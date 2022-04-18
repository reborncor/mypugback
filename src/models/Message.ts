import {ObjectId} from "bson";

export interface Message {
    id? : ObjectId
    author : string;
    content : string;
    date : string;

}
