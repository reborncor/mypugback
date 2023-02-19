import { Request, Response } from "express";
import {
  checkThatSignalExistOrThrow,
  checkThatUserExistsOrThrow,
} from "../../../util/validator/checkdata";
import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import SignalUserRepository from "../../../repository/SignalRepository";
import { SignalFactory, SignalReason } from "../../../models/SignalFactory";
import { ObjectId } from "bson";
import moment from "moment";

export const signalUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { username, reason } = req.body;
    const user = await execute(userId, username, reason);
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

const execute = async (
  userId: string,
  username: string,
  reason: SignalReason
): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);
  const otherUser = await UserRepository.findByUsername(username);

  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(otherUser);
  const date = moment().unix();

  const signal: SignalFactory = {
    userId: new ObjectId(otherUser._id),
    username: otherUser.username,
    reason,
    senderId: new ObjectId(currentUser._id),
    date,
  };
  const result = await SignalUserRepository.insert(signal);
  checkThatSignalExistOrThrow(result);
  return {
    code: 0,
    message: "Signalement effectué",
  };
};
