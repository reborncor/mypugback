import { Request, Response } from "express";
import {
  checkThatPasswordsAreEqualsOrThrow,
  checkThatUserExistsOrThrow,
  checkThatUserIsNotBanned,
  checkThatUserSignInCredentialsOrThrow,
} from "../../../util/validator/checkdata";
import { CustomError } from "../../../util/error/CustomError";
import UserRepository from "../../../repository/UserRepository";
import { htmlContentPage, subjectEmail, successCode } from "../../../util/util";
import { User } from "../../../models/User";
import { generateAccessToken } from "../../../util/security/tokenManagement";
import { userToUserResponse } from "../../../response/UserResponse";
import { sendEmail } from "../../emailSender/EmailSender";

export const resetPasswordPage = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const htmlContent = htmlContentPage(<string>username);
    res.send(htmlContent);
  } catch (err: any) {
    if (err instanceof CustomError) {
      res.status(400).json({ message: err.message, code: err.code });
    } else {
      console.log(err);
    }
  }
};
