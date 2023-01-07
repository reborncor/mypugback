import { Request, Response } from "express";
import { checkThatUserExistsOrThrow } from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import PugRepository from "../../../repository/PugRepository";
import { successCode } from "../../../util/util";
import { userPugToResponseNoComment } from "../../../response/UserPugResponse";
const fs = require("fs").promises;

export const getAllPugsFromUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username } = req.query;
    const result = await execute(userId, <string>username);
    res
      .status(200)
      .json({
        code: successCode,
        message: "Pugs Utilisateur",
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

const execute = async (userId: string, username: string): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);
  const otherUser = await UserRepository.findByUsername(username);
  checkThatUserExistsOrThrow(currentUser);

  const result = await PugRepository.getAllPugsFromUserNoComment(
    otherUser.username
  );
  return userPugToResponseNoComment(
    result,
    currentUser.username,
    otherUser.username
  );
};
