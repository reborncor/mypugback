import { Request, Response } from "express";
import { decodeToken } from "../../util/security/tokenManagement";
import { CustomError } from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";
import { checkThatUserExistsOrThrow } from "../../util/validator/checkdata";
import { jobSelectParticipants } from "./JobSelectParticipants";

export const changeSelectedParticipants = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const user = await execute(userId);
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

const execute = async (userId: string): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);

  checkThatUserExistsOrThrow(currentUser);
  return jobSelectParticipants();
};
