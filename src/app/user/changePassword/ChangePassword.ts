import { Request, Response } from "express";
import { checkThatUserExistsOrThrow } from "../../../util/validator/checkdata";
import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import UserResponse, {
  userToUserResponse,
} from "../../../response/UserResponse";
import { successCode } from "../../../util/util";
import { encodePassword } from "../../../util/security/passwordManagement";

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await execute(username, password);
    res.status(200).json({
      code: successCode,
      message: "Votre mot de passe a été réinitialisé",
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
  username: string,
  password: string
): Promise<UserResponse> => {
  const currentUser = await UserRepository.findByUsername(username);

  checkThatUserExistsOrThrow(currentUser);
  const hashedPassword = await encodePassword(password);
  const result = await UserRepository.updateUserPassword(
    currentUser,
    hashedPassword
  );
  return userToUserResponse(result);
};
