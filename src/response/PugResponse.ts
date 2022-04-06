import {ObjectId} from "bson";
import {PugDetail} from "../models/PugDetail";
import {Pug} from "../models/Pug";

export interface PugResponse{
    imageURL : string;
    imageTitle : string;
    imageDescription : string;
    imageFormat : string;
    imageData : string;
    details : PugDetail[];
    like : number;
}

export function pugToResponse(pug : Pug) : PugResponse{
    return {
        details : pug.details? pug.details : [],
        imageData: pug.imageData,
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like

    }
}

