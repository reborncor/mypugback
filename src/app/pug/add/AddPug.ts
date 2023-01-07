import { Request, Response } from "express";
import BaseResponse from "../../../response/BaseResponse";
import { checkThatUserExistsOrThrow } from "../../../util/validator/checkdata";
import moment from "moment";

import UserRepository from "../../../repository/UserRepository";
import { CustomError } from "../../../util/error/CustomError";
import { Pug } from "../../../models/Pug";
import { decodeToken } from "../../../util/security/tokenManagement";
import PugRepository from "../../../repository/PugRepository";
import { PugDetail } from "../../../models/PugDetail";
import { ObjectId } from "bson";
const fs = require("fs").promises;
const { promisify } = require("util");

export const addPug = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { imageDescription, details, isCrop, height, imageUrl } = req.body;
    const { userId } = decodeToken(token);
    const result = await execute(
      userId,
      imageDescription,
      details,
      isCrop,
      height,
      imageUrl
    );
    res
      .status(201)
      .json({
        code: result.code,
        message: result.message,
        payload: result.payload,
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
  imageDescription: string,
  details: PugDetail[],
  isCrop: boolean,
  height: number,
  imageUrl: string
): Promise<BaseResponse<null>> => {
  const currentUser = await UserRepository.findById(userId);
  checkThatUserExistsOrThrow(currentUser);

  if (details) {
    details.forEach((value) => {
      value.positionX = parseFloat(value.positionX.toString());
      value.positionY = parseFloat(value.positionY.toString());
    });
  }
  const date = moment().unix();
  const newPug: Pug = {
    comments: [],
    id: new ObjectId(),
    usersLike: [],
    date: date,
    imageData: "",
    imageFormat: "",
    isCrop: isCrop ? true : false,
    height: parseInt(String(height)),
    details: details ? details : [],
    imageDescription,
    imageTitle: "",
    imageURL: imageUrl,
    like: 0,
  };
  await PugRepository.addNewPug(currentUser, newPug);
  await UserRepository.updateUserPug(currentUser, 1);

  return {
    code: 0,
    message: "Nouveau pug ajouté avec succès",
  };
};
