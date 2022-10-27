import {PugDetail} from "./PugDetail";
import {ObjectId} from "bson";
import {Comment} from "./Comment";

export interface Pug{
     id? : ObjectId;
     imageURL : string;
     imageTitle : string;
     imageDescription : string;
     imageFormat : string;
     imageData : string;
     comments : Comment[];
     isCrop : boolean;
     height : number;

    date : number;
    details : PugDetail[];
    like : number;
    usersLike : string[],
}
