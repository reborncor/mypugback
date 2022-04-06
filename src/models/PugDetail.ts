import {ObjectId} from "bson";

export interface PugDetail {
     id? : ObjectId;
     positionX : number;
     positionY : number;
     text : string;
}