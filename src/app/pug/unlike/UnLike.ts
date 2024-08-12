import { Request, Response } from "express";
import {
  checkThatUserExistsOrThrow,
  checkThatUserHasLiked,
} from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import PugRepository from "../../../repository/PugRepository";
import { Pug } from "../../../models/Pug";

export const unLikePug = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { pugId, username } = req.body;
    const { userId } = decodeToken(token);
    const result = await execute(userId, pugId, username);
    res.status(200).json({
      code: result.code,
      message: result.message,
      payload: result.payload,
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
  pugId: string,
  username: string
): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);

  checkThatUserExistsOrThrow(currentUser);

  const data = await PugRepository.findById(pugId, username);
  const pug: Pug = data.pugs[0];

  const test = await PugRepository.findUserInPugLike(
    currentUser.username,
    pug,
    username
  );
  checkThatUserHasLiked(test);

  await PugRepository.unLikePug(currentUser, pug, username);
  return { code: 0, message: "Like retiré", payload: "" };
};
