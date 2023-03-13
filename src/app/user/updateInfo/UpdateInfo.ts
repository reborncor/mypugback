import { Request, Response } from "express";
import {
  checkThatSignalExistOrThrow,
  checkThatUserExistsOrThrow,
} from "../../../util/validator/checkdata";
import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import SignalUserRepository from "../../../repository/SignalRepository";
import { SignalFactory } from "../../../models/SignalFactory";
import { ObjectId } from "bson";
import moment from "moment";
import { SignalReason } from "../../../models/SignalReason";
import UserResponse, {
  userToUserResponse,
} from "../../../response/UserResponse";
import { successCode } from "../../../util/util";

export const updateInfoUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const { description, profilePicture } = req.body;
    const user = await execute(userId, description, profilePicture);
    res.status(200).json({
      code: successCode,
      message: "Information utilisateur mise à jour",
      payload: user,
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
  description: string,
  profilePicture: string
): Promise<UserResponse> => {
  const currentUser = await UserRepository.findById(userId);

  checkThatUserExistsOrThrow(currentUser);

  const result = await UserRepository.updateUserInfo(
    currentUser,
    description,
    profilePicture
  );
  return userToUserResponse(result);
};
