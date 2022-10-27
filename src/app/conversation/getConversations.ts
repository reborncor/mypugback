import UserRepository from "../../repository/UserRepository";
import {
  checkThatConversationsExist,
  checkThatUserExistsOrThrow

} from "../../util/validator/checkdata";
import ConversationRepository from "../../repository/ConversationRepository";
import {decodeToken} from "../../util/security/tokenManagement";
import {successCode} from "../../util/util";
import {CustomError} from "../../util/error/CustomError";
import {Request, Response} from "express";
import {conversationsToResponse} from "../../response/ConversationResponse";

export const getAllConversationFromUser = async (req : Request, res : Response): Promise<any> => {

  const token = req.headers.authorization?.split(" ")[1] || "";
  try{
    const {userId} = decodeToken(token);
    const  conversations = await execute(userId);
    res.status(200).json({code : successCode, message : "Liste des conversations : ", payload : conversations});
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

const execute = async (userId : string) => {
  const currentUser = await UserRepository.findById(userId);
  checkThatUserExistsOrThrow(currentUser);
  const conversations = await ConversationRepository.findAllConversationsFromUser(currentUser.username);
  checkThatConversationsExist(conversations);
  return conversationsToResponse(conversations);
}

