import {CustomError} from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";
import {checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import ConversationRepository from "../../repository/ConversationRepository";
import {Message} from "../../models/Message";
import {successCode} from "../../util/util";
import {ObjectId} from "bson";
import moment from "Moment";

export const sendMessage = async (currentUsername : string, receiverUsername : string, content: string): Promise<any> => {

  try{
    const  message = await execute(currentUsername,receiverUsername, content);
   return {message, code : successCode}
  }catch (err : any){
    if(err instanceof CustomError){
      console.log(err);
      return ({message : err.message, code : err.code});
    }
    else{
      console.log(err);
    }

  }



}

const execute = async (currentUsername : string, receiverUsername : string, content : string) => {
  const currentUser = await UserRepository.findByUsername(currentUsername);
  const receiverUser = await UserRepository.findByUsername(receiverUsername);

  checkThatUserExistsOrThrow(currentUser);
  checkThatUserExistsOrThrow(receiverUser);
  const conversation = await ConversationRepository.findByMembers([currentUser.username, receiverUser.username])
  const time = moment().unix().toString()
  const message : Message = {content, time, senderUsername : currentUser.username, receiverUsername : receiverUsername, _id : new ObjectId()}

  await  ConversationRepository.addMessageToConversation(message, conversation);
  return message;

}



