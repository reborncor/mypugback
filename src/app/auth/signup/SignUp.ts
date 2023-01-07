import { Request, Response } from "express";
import BaseResponse from "../../../response/BaseResponse";
import {
  checkThatUserDoesntExistOrThrow,
  checkThatUserSignUpCredentialsOrThrow,
  checkThatUserWithPhoneNumberDoesntExistOrThrow,
  checkThatUserWithUsernameDoesntExistOrThrow,
} from "../../../util/validator/checkdata";
import { User } from "../../../models/User";
import { encodePassword } from "../../../util/security/passwordManagement";
import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { generateAccessToken } from "../../../util/security/tokenManagement";
import { userToUserResponse } from "../../../response/UserResponse";
import { executeAddFriend } from "../../user/follow/Follow";

export const signUp = async (req: Request, res: Response) => {
  const { email, username, phoneNumber, password } = req.body;
  // console.log("DATA :", req.body)
  try {
    const user = await signUpUser(email, username, password, phoneNumber);
    const addUserLucie = await executeAddFriend(String(user._id), "lucie");

    res
      .status(201)
      .json({
        code: 0,
        message: "inscription réalisée avec succès",
        payload: userToUserResponse(user),
        token: generateAccessToken(user),
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

const signUpUser = async (
  email: string,
  username: string,
  password: string,
  phoneNumber: string
): Promise<User> => {
  checkThatUserSignUpCredentialsOrThrow(email, password, phoneNumber, username);

  const existingUser = await UserRepository.findByEmail(email);
  const existingUserWithUserName = await UserRepository.findByUsername(
    username
  );
  const existingUserWithPhoneNumber = await UserRepository.findByPhoneNumber(
    phoneNumber
  );

  checkThatUserDoesntExistOrThrow(existingUser);
  checkThatUserWithUsernameDoesntExistOrThrow(existingUserWithUserName);
  checkThatUserWithPhoneNumberDoesntExistOrThrow(existingUserWithPhoneNumber);

  const hashedPassword = await encodePassword(password);
  const newUser: User = {
    admin: false,
    email,
    password: hashedPassword,
    phoneNumber,
    username,
    followers: 0,
    following: 0,
    pugs: 0,
  };

  return await UserRepository.insert(newUser);
};
