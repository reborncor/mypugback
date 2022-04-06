import {Request, Response} from "express";
import BaseResponse from "../../../response/BaseResponse";
import {checkThatUserExistsOrThrow,} from "../../../util/validator/checkdata";

import UserRepository from "../../../repository/UserRepository";
import {CustomError} from "../../../util/error/CustomError";
import {Pug} from "../../../models/Pug";
import {decodeToken} from "../../../util/security/tokenManagement";
import PugRepository from "../../../repository/PugRepository";
const fs = require('fs').promises;





export const addPug = async  (req : Request, res : Response) =>{

    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        const { imageTitle, imageDescription, details} = req.body
        const {userId} = decodeToken(token);
        console.log("FICHIER : ",req.file);
        const  result = await execute(userId,req.file?.path, req.file?.mimetype,imageTitle, imageDescription, details );
        res.status(201).json({code : result.code, message : result.message, payload : result.payload});
    }catch (err : any){

        if(err instanceof CustomError){
            console.log(err);
            res.status(400).json({message : err.message, code : err.code});
        }
        else{
            console.log(err);
        }

    }

}

const execute = async (userId: string, path: string | undefined, format: string | undefined, imageDescription : string, imageTitle : string, details : any): Promise<BaseResponse<null>> => {

    const currentUser = await UserRepository.findById(userId);
    checkThatUserExistsOrThrow(currentUser);

    console.log("PATH",path);

    const contents = await fs.readFile(path, {encoding: 'base64'});
    console.log(contents.length);
    const newPug : Pug = {
        imageData: contents, imageFormat: format? format : "",
        details: details, imageDescription, imageTitle, imageURL: path? path : "", like: 0
    }
    await PugRepository.addNewPug( currentUser, newPug);

    return  {
        code: 0, message: "Nouveau pug ajouté avec succès",
    }

}

