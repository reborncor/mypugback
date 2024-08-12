import { Request, Response } from "express";
import { checkThatUserExistsOrThrow } from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import { successCode } from "../../../util/util";
import SignalPugRepository from "../../../repository/SignalPugRepository";
import {
  signalPugResponse,
  SignalPugResponse,
} from "../../../response/SignalPugResponse";

export const getPugSignal = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { pugId, username } = req.query;

    const result = await execute(userId, <string>pugId, <string>username);
    res.status(200).json({
      code: successCode,
      message: "Affichage du pug signalé",
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
  pugId: string,
  username: string
): Promise<SignalPugResponse> => {
  const currentUser = await UserRepository.findById(userId);

  checkThatUserExistsOrThrow(currentUser);

  const result = await SignalPugRepository.findByPugId(pugId, username);

  return signalPugResponse(result);
};
