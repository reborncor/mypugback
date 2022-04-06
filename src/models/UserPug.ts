import {ObjectId} from "bson";
import {Pug} from "./Pug";

export  interface UserPug{
    _id? : ObjectId;
    username : string;
    pugs : Pug[];
}