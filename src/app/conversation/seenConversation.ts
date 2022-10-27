import {CustomError} from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";
import {checkThatConversationExist, checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import ConversationRepository from "../../repository/ConversationRepository";
import {Message} from "../../models/Message";
import {successCode} from "../../util/util";
import {ObjectId} from "bson";
import moment from "moment";

export const seenConversation = async (currentUsername : string, conversationId : string): Promise<any> => {

    try{
        const  message = await execute(currentUsername,conversationId);
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

const execute = async (currentUsername : string, conversationId : string) => {
    const currentUser = await UserRepository.findByUsername(currentUsername);
    const conversation = await ConversationRepository.findById(conversationId);

    checkThatUserExistsOrThrow(currentUser);
    checkThatConversationExist(conversation);

    await  ConversationRepository.updateConversationOnSeen(conversation, currentUser)
    return "Conversation vu";

}
