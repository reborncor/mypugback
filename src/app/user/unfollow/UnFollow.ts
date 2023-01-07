import { Request, Response } from "express";
import {
  checkThatUserExistsOrThrow,
  checkThatUserIsNotAlreadyFollow,
  checkThatUserNotFollowed,
  checkThatUserSignUpCredentialsOrThrow,
} from "../../../util/validator/checkdata";
import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import FollowerRepository from "../../../repository/FollowerRepository";
import { Follower } from "../../../models/Follower";
import { ObjectId } from "bson";

export const unFollowUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username } = req.body;
    const user = await execute(userId, username);
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

const execute = async (userId: string, username: string): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);
  const otherUser = await UserRepository.findByUsername(username);

  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(otherUser);

  const userNotFollow = await FollowerRepository.findUserInFollwingList(
    currentUser.username,
    otherUser.username
  );
  checkThatUserNotFollowed(userNotFollow);

  const follower: Follower = {
    _id: new ObjectId(otherUser._id),
    username: otherUser.username,
  };
  const following: Follower = {
    _id: new ObjectId(otherUser._id),
    username: currentUser.username,
  };
  await FollowerRepository.deleteUserFromFollowing(currentUser, follower);
  await FollowerRepository.deleteUserFromFollower(otherUser, following);

  await UserRepository.updateUserFollowing(currentUser, -1);
  await UserRepository.updateUserFollower(otherUser, -1);

  return {
    code: 0,
    message: "Nouvel utilisateur unfollow",
  };
};
