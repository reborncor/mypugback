import UserRepository from "../../repository/UserRepository";
import { checkThatUserExistsOrThrow } from "../../util/validator/checkdata";
import ConversationRepository from "../../repository/ConversationRepository";
import { Request, Response } from "express";
import { decodeToken } from "../../util/security/tokenManagement";
import { successCode } from "../../util/util";
import { CustomError } from "../../util/error/CustomError";

export const getConversationPageable = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    const { userId } = decodeToken(token);
    const { username, startInd, endInd } = req.query;

    const oldmessages = await execute(
      userId,
      <string>username,
      parseInt(<string>startInd),
      parseInt(<string>endInd)
    );
    res.status(200).json({
      code: successCode,
      message: "Anciens messages : ",
      payload: { oldmessages: oldmessages },
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
  receiverUsername: string,
  startInd: number,
  endInd: number
) => {
  const currentUser = await UserRepository.findById(userId);
  const receiverUser = await UserRepository.findByUsername(receiverUsername);

  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(receiverUser);

  const result = await ConversationRepository.findByMembersPageable(
    [currentUser.username, receiverUser.username],
    startInd,
    endInd
  );
  result.chat.reverse();
  return result.chat;
};
