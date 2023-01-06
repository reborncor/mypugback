import {ObjectId} from "bson";
import {PugDetail} from "../models/PugDetail";
import {Pug} from "../models/Pug";
import {Comment} from "../models/Comment";

export interface PugResponse{
    id? : ObjectId;
    imageURL : string;
    imageTitle : string;
    imageDescription : string;
    imageFormat : string;
    details : PugDetail[];
    like : number;
    date : number;
    isLiked : boolean;
    comments? : Comment[];
    numberOfComments : number;
    author : string;
    isCrop : boolean;
    height : number;
}

export function pugToResponse(pug : Pug,username : string, author : string) : PugResponse{
    let isLiked = false;
    pug.usersLike.forEach(value => {if(value == username){isLiked = true}});
    return {
        id : pug.id,
        date : pug.date,
        details : pug.details? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked : isLiked,
        isCrop : pug.isCrop ? pug.isCrop : false,
        height : pug.height? pug.height : 1,
        comments: pug.comments,
        author : author,
        numberOfComments :  pug.comments.length,

    }
}

export function pugToResponseNoComment(pug : Pug,username : string, author : string, numberOfComments: number) : PugResponse{
    let isLiked = false;
    pug.usersLike.forEach(value => {if(value == username){isLiked = true}});
    return {
        id : pug.id,
        date : pug.date,
        details : pug.details? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat,
        imageTitle: pug.imageTitle? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like,
        isLiked : isLiked,
        isCrop : pug.isCrop ? pug.isCrop : false,
        height : pug.height? pug.height : 1,
        author : author,
        numberOfComments :  numberOfComments,

    }
}

export function pugToResponsePageable(pug : Pug,username : string, author : string) : PugResponse{
    let isLiked = false;
    pug.usersLike.forEach(value => {if(value == username){isLiked = true}});
    return {
        id : pug.id,
        date : pug.date,
        details : pug.details? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat? pug.imageFormat  : "",
        imageTitle: pug.imageTitle? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like?  pug.like : 0 ,
        isLiked : isLiked? isLiked : false,
        isCrop : pug.isCrop ? pug.isCrop : false,
        height : pug.height? pug.height : 1,
        comments: pug.comments.slice(-1),
        author : author? author : "",
        numberOfComments : pug.comments.length

    }
}
export function pugToResponsePageableSorted(pug : Pug,username : string, author : string) : PugResponse{
    let isLiked = false;
    pug.usersLike.forEach(value => {if(value == username){isLiked = true}});
    return {
        id : pug.id,
        date : pug.date,
        details : pug.details? pug.details : [],
        imageDescription: pug.imageDescription ? pug.imageDescription : "",
        imageFormat: pug.imageFormat? pug.imageFormat  : "",
        imageTitle: pug.imageTitle? pug.imageTitle : "",
        imageURL: pug.imageURL ? pug.imageURL : "",
        like: pug.like?  pug.like : 0 ,
        isLiked : isLiked? isLiked : false,
        isCrop : pug.isCrop ? pug.isCrop : false,
        height : pug.height? pug.height : 1,
        comments: pug.comments.slice(-1),
        author : author? author : "",
        numberOfComments : pug.comments.length

    }
}
