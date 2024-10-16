import { Request, Response } from "express";
import {
  checkThatPasswordsAreEqualsOrThrow,
  checkThatUserExistsOrThrow,
  checkThatUserIsNotBanned,
  checkThatUserSignInCredentialsOrThrow,
} from "../../../util/validator/checkdata";
import { CustomError } from "../../../util/error/CustomError";
import UserRepository from "../../../repository/UserRepository";
import {
  htmlContentEmail,
  htmlContentPage,
  subjectEmail,
  successCode,
} from "../../../util/util";
import { User } from "../../../models/User";
import { generateAccessToken } from "../../../util/security/tokenManagement";
import { userToUserResponse } from "../../../response/UserResponse";
import { sendEmail } from "../../emailSender/EmailSender";

export const resetPassword = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const response = await execute(username);
    res.status(200).json({
      code: successCode,
      message: "Demande de reset de mot de passe",
      payload: response,
    });
  } catch (err: any) {
    if (err instanceof CustomError) {
      res.status(400).json({ message: err.message, code: err.code });
    } else {
      console.log(err);
    }
  }
};

const execute = async (username: string): Promise<String> => {
  const existingUser = await UserRepository.findByUsername(username);
  await checkThatUserExistsOrThrow(existingUser);
  await sendEmail(existingUser.email, subjectEmail, htmlContentEmail(username));

  return htmlContentEmail(username);
};
