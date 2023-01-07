import { Request, Response } from "express";
import {
  checkThatPugExistOrThrow,
  checkThatUserExistsOrThrow,
} from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import PugRepository from "../../../repository/PugRepository";
import { successCode } from "../../../util/util";
import { Pug } from "../../../models/Pug";
import { pugToResponse } from "../../../response/PugResponse";

export const getPug = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username, pugId } = req.query;
    const result = await execute(userId, <string>username, <string>pugId);
    res
      .status(200)
      .json({ code: successCode, message: "Pug utilisateur", payload: result });
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
  username: string,
  pugId: string
): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);
  checkThatUserExistsOrThrow(currentUser);

  const data = await PugRepository.findById(pugId, username);

  const pug: Pug = data.pugs[0];
  checkThatPugExistOrThrow(pug);
  return pugToResponse(pug, username, username);
};
