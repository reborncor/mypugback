import { Request, Response } from "express";
import BaseResponse from "../../../response/BaseResponse";

import { CustomError } from "../../../util/error/CustomError";
import { decodeToken } from "../../../util/security/tokenManagement";
import { PugDetail } from "../../../models/PugDetail";
const fs = require("fs").promises;

export const editPug = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { imageTitle, imageDescription, details } = req.body;
    const { userId } = decodeToken(token);

    const result = await execute(
      userId,
      req.file?.path,
      req.file?.mimetype,
      imageTitle,
      imageDescription,
      details
    );
    res.status(201).json({
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
  path: string | undefined,
  format: string | undefined,
  imageDescription: string,
  imageTitle: string,
  details: PugDetail[]
): Promise<BaseResponse<null>> => {
  return {
    code: 0,
    message: "Nouveau pug ajouté avec succès",
  };
};
