import {PugDetail} from "./PugDetail";
import {ObjectId} from "bson";

export interface Pug{
     id? : ObjectId;
     imageURL : string;
     imageTitle : string;
     imageDescription : string;
     imageFormat : string;
     imageData : string;
    details : PugDetail[];
    like : number;
}