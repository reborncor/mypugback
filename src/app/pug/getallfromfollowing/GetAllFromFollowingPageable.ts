import { Request, Response } from "express";
import { checkThatUserExistsOrThrow } from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import PugRepository from "../../../repository/PugRepository";
import { successCode } from "../../../util/util";
import FollowerRepository from "../../../repository/FollowerRepository";
import { Follower } from "../../../models/Follower";
import {
  PugResponse,
  pugToResponsePageableSorted,
} from "../../../response/PugResponse";

export const getAllPugsFromFollowingPagealble = async (
  req: Request,
  res: Response
) => {
  try {
    const { startInd } = req.query;

    const token = req.headers.authorization?.split(" ")[1] || "";
    const { userId } = decodeToken(token);
    const result = await execute(userId, parseInt(<string>startInd));
    res.status(200).json({
      code: successCode,
      message: "Pugs Utilisateur",
      payload: { pugs: result },
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

const execute = async (userId: string, startInd: number): Promise<any> => {
  const currentUser = await UserRepository.findById(userId);
  checkThatUserExistsOrThrow(currentUser);
  const data: Follower[] = await FollowerRepository.findAllFollowingFromUser(
    currentUser.username
  );
  const usernames: string[] = [];
  data.forEach((value) => usernames.push(value.username));
  const result = await PugRepository.getAllPugsFromFollowingPageable(
    usernames,
    startInd
  );
  const pugsResponse: PugResponse[] = [];
  result.forEach((elem: any) => {
    pugsResponse.push(
      pugToResponsePageableSorted(elem.pug, currentUser.username, elem._id)
    );
  });

  return pugsResponse;
};
