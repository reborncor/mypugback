import { Request, Response } from "express";
import {
  checkThatUserExistsOrThrow,
  checkThatUsersExistsOrThrow,
} from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import { successCode } from "../../../util/util";

import {
  UserResponseForFind,
  userToUserResponseForFind,
} from "../../../response/UserResponseForFind";

export const findUsers = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username } = req.query;
    const result = await execute(userId, <string>username);
    res.status(200).json({
      code: successCode,
      message: "Liste des utilisateur",
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
): Promise<UserResponseForFind[]> => {
  const currentUser = await UserRepository.findById(userId);
  const otherUsers = await UserRepository.findUsersByUsername(username);
  checkThatUserExistsOrThrow(currentUser);
  checkThatUsersExistsOrThrow(otherUsers);

  const result: UserResponseForFind[] = [];
  otherUsers.forEach((value) => result.push(userToUserResponseForFind(value)));
  return result;
};
