import { ObjectId } from "bson";
import { PugDetail } from "../models/PugDetail";
import { Pug } from "../models/Pug";
import { Comment } from "../models/Comment";
import { UserFactory } from "../models/UserFactory";
import { UserFactoryResponse } from "./UserFactoryResponse";

export interface PugResponse {
  id?: ObjectId;
  imageURL: string;
  imageTitle: string;
  imageDescription: string;
  imageFormat: string;
  details: PugDetail[];
  like: number;
  date: number;
  isLiked: boolean;
  comments: Comment[];
  numberOfComments: number;
  author: UserFactory;
  isCrop: boolean;
  height: number;
}

export function pugToResponse(
  pug: Pug,
  username: string,
  author: UserFactory
): PugResponse {
  let isLiked = false;
  pug.usersLike.forEach((value) => {
    if (value == username) {
      isLiked = true;
    }
  });
  return {
    id: pug.id,
    date: pug.date,
    details: pug.details ? pug.details : [],
    imageDescription: pug.imageDescription ? pug.imageDescription : "",
    imageFormat: pug.imageFormat,
    imageTitle: pug.imageTitle ? pug.imageTitle : "",
    imageURL: pug.imageURL ? pug.imageURL : "",
    like: pug.like,
    isLiked: isLiked,
    isCrop: pug.isCrop ? pug.isCrop : false,
    height: pug.height ? pug.height : 1,
    comments: pug.comments,
    author: author ?? null,
    numberOfComments: pug.comments.length,
  };
}

export function pugToResponseNoComment(
  pug: Pug,
  user: UserFactoryResponse,
  author: UserFactory,
  numberOfComments: number
): PugResponse {
  let isLiked = false;
  pug.usersLike.forEach((value) => {
    if (value == user.username) {
      isLiked = true;
    }
  });
  return {
    id: pug.id,
    date: pug.date,
    details: pug.details ? pug.details : [],
    imageDescription: pug.imageDescription ? pug.imageDescription : "",
    imageFormat: pug.imageFormat,
    imageTitle: pug.imageTitle ? pug.imageTitle : "",
    imageURL: pug.imageURL ? pug.imageURL : "",
    like: pug.like,
    isLiked: isLiked,
    isCrop: pug.isCrop ? pug.isCrop : false,
    height: pug.height ? pug.height : 1,
    author: author ?? null,
    numberOfComments: numberOfComments,
    comments: [],
  };
}

export function pugToResponsePageableSorted(
  pug: Pug,
  user: UserFactoryResponse,
  author: UserFactory
): PugResponse {
  let isLiked = false;
  pug.usersLike.forEach((value) => {
    if (value == user.username) {
      isLiked = true;
    }
  });
  return {
    id: pug.id,
    date: pug.date,
    details: pug.details ? pug.details : [],
    imageDescription: pug.imageDescription ? pug.imageDescription : "",
    imageFormat: pug.imageFormat ? pug.imageFormat : "",
    imageTitle: pug.imageTitle ? pug.imageTitle : "",
    imageURL: pug.imageURL ? pug.imageURL : "",
    like: pug.like ? pug.like : 0,
    isLiked: isLiked ? isLiked : false,
    isCrop: pug.isCrop ? pug.isCrop : false,
    height: pug.height ? pug.height : 1,
    comments: pug.comments.slice(-1),
    author: author ?? null,
    numberOfComments: pug.comments.length,
  };
}
