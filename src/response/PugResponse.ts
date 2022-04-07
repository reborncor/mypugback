import {ObjectId} from "bson";
import {PugDetail} from "../models/PugDetail";
import {Pug} from "../models/Pug";

export interface PugResponse{
    id? : ObjectId;
    imageURL : string;
    imageTitle : string;
    imageDescription : string;
    imageFormat : string;
    imageData : string;
    details : PugDetail[];
    like : number;
    date : number;
    isLiked : boolean
}

export function pugToResponse(pug : Pug,username : string) : PugResponse{
    let isLiked = false;
    pug.usersLike.forEach(value => {if(value == username){isLiked = true}});
    return {
        id : pug.id,
        date : pug.date,
        details : pug.details? pug.details : [],
        imageData: pug.imageData,
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked : isLiked,

    }
}

