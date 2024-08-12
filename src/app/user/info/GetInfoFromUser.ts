import { Request, Response } from "express";
import {
  checkThatUserExistsOrThrow,
  checkThatUserisNotBlocked,
} from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import { successCode } from "../../../util/util";
import UserResponse, {
  userToResponseProfile,
} from "../../../response/UserResponse";
import FollowerRepository from "../../../repository/FollowerRepository";

export const getUserWithName = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username } = req.query;
    const result = await execute(userId, <string>username);
    res.status(200).json({
      code: successCode,
      message: "Information utilisateur",
      payload: result,
    });
  } catch (err: any) {
    if (err instanceof CustomError) {
      console.log(err);
      res.status(400).json({ message: err.message, code: err.code });
    } else {
      console.log(err);
    }
  }
};

const execute = async (
  userId: string,
  username: string
): Promise<UserResponse> => {
  const currentUser = await UserRepository.findById(userId);
  const otherUser = await UserRepository.findByUsername(username);

  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(otherUser);

  const userAlreadyFollow = await FollowerRepository.findUserInFollwingList(
    currentUser.username,
    otherUser.username
  );
  const userBlocked = await FollowerRepository.findUserInBlockingList(
    currentUser.username,
    otherUser.username
  );
  checkThatUserisNotBlocked(userBlocked);
  const otherBlocked = await FollowerRepository.findUserInBlockingList(
    otherUser.username,
    currentUser.username
  );
  checkThatUserisNotBlocked(otherBlocked);
  return userToResponseProfile(otherUser, userAlreadyFollow);
};
