import {ObjectId} from "bson";
import {UserPug} from "../models/UserPug";
import {Pug} from "../models/Pug";
import {PugResponse, pugToResponse} from "./PugResponse";

export  interface UserPugResponse{
    _id? : ObjectId;
    username : string;
    pugs : PugResponse[];
}

export function userPugToResponse(userPug : UserPug) : UserPugResponse {
    const pugsResponse : PugResponse[] = [];
    userPug.pugs.forEach(value => pugsResponse.push(pugToResponse(value, userPug.username, userPug.username)))
    return {
        pugs : pugsResponse,
        username : userPug.username
    }
}
