import { ObjectId } from "bson";
import { UserPug } from "../models/UserPug";
import {
  PugResponse,
  pugToResponse,
  pugToResponseNoComment,
} from "./PugResponse";
import { UserPugNoComment } from "../models/UserPugNoComment";

export interface UserPugResponse {
  _id?: ObjectId;
  username: string;
  pugs: PugResponse[];
}

export interface UserPugNoCommentResponse {
  _id?: string;
  username: string;
  pugs: PugResponse[];
}

export function userPugToResponse(
  userPug: UserPug,
  username: string
): UserPugResponse {
  const pugsResponse: PugResponse[] = [];
  userPug.pugs.forEach((value) =>
    pugsResponse.push(pugToResponse(value, username, userPug.username))
  );
  return {
    pugs: pugsResponse,
    username: userPug.username,
  };
}
export function userPugToResponseNoComment(
  userPug: UserPugNoComment[],
  username: string,
  otherUser: string
): UserPugNoCommentResponse {
  const pugsResponse: PugResponse[] = [];
  userPug.forEach((value) =>
    pugsResponse.push(
      pugToResponseNoComment(
        value.pug,
        username,
        value._id,
        value.numberOfComments
      )
    )
  );
  return {
    pugs: pugsResponse,
    username: otherUser,
  };
}
