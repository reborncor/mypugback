import { Request, Response } from "express";
import BaseResponse from "../../../response/BaseResponse";
import {
  checkThatUserExistsOrThrow,
  checkThatUserIsNotAlreadyFollow,
  checkThatUserisntHimself,
  checkThatUserSignUpCredentialsOrThrow,
} from "../../../util/validator/checkdata";
import { User } from "../../../models/User";
import { encodePassword } from "../../../util/security/passwordManagement";
import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import FollowerRepository from "../../../repository/FollowerRepository";
import { Follower } from "../../../models/Follower";
import { ObjectId } from "bson";

export const followUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username } = req.body;
    const user = await executeAddFriend(userId, username);
    res
      .status(200)
      .json({ code: user.code, message: user.message, payload: user.payload });
  } catch (err: any) {
    if (err instanceof CustomError) {
      console.log(err);
      res.status(400).json({ message: err.message, code: err.code });
    } else {
      console.log(err);
    }
  }
};

export const executeAddFriend = async (
  userId: string,
  username: string
): Promise<BaseResponse<any>> => {
  const currentUser = await UserRepository.findById(userId);
  const otherUser = await UserRepository.findByUsername(username);

  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(otherUser);
  checkThatUserisntHimself(currentUser, otherUser);

  const userAlreadyFollow = await FollowerRepository.findUserInFollwingList(
    currentUser.username,
    otherUser.username
  );
  checkThatUserIsNotAlreadyFollow(userAlreadyFollow);

  const id = new ObjectId(otherUser._id);
  const follower: Follower = {
    _id: id,
    username: otherUser.username,
  };
  const following: Follower = {
    _id: id,
    username: currentUser.username,
  };

  await FollowerRepository.addUserToFollowing(currentUser, follower);
  await FollowerRepository.addUserToFollower(otherUser, following);

  await UserRepository.updateUserFollower(otherUser, 1);
  await UserRepository.updateUserFollowing(currentUser, 1);

  return {
    code: 0,
    message: "Nouvel utilisateur suivit",
  };
};
