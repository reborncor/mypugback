import {db} from "./db";
import {Message} from "../models/Message";
import Conversation from "../models/Conversation";
import {messageToResponse} from "../response/MessageResponse";
import {User} from "../models/User";


const collectionName = "conversation";
export default class ConversationRepository{


    static async insert(conversation: Conversation): Promise<Conversation> {
        const call = db.get(collectionName);
        return await call.insert(conversation);
    }

    static async addMessageToConversation(message: Message, conversation : Conversation): Promise<Conversation> {
        const call = db.get(collectionName);
        let result = await call.findOneAndUpdate(
            {members : conversation.members},
            {
                $push:{
                    chat : {$each :[messageToResponse(message)], $position : 0}
                }
            },
        );
        if(!result){
            await call.findOneAndUpdate(
                {members : conversation.members.reverse()},
                {
                    $push:{
                        chat : {$each :[messageToResponse(message)], $position : 0}
                    }
                },
            );
        }
        return result;
    }

    static async updateConversationOnSeen(conversation : Conversation, user : User): Promise<Conversation> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {members : conversation.members, seen : {$ne :user.username}},
            {
                $push:{
                    seen : user.username
                }
            },
        );
    }
    static async updateConversationOnNotSeen(conversation : Conversation, user : User): Promise<Conversation> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {members : conversation.members},
            {
                $pull:{
                    seen : user.username
                }
            },
        );
    }




    static async findById(id: string): Promise<Conversation> {
        const call = db.get(collectionName);
        return await call.findOne({
            _id: id,
        });
    }

    static async findAllConversationsFromUser(username : string): Promise<Conversation[]> {
        const call = db.get(collectionName);
        return await call.find({
                members : username
            },{
                projection :{chat :{$slice :[0,1]}}      }
        );
    }

    static async findByMembers(members : string[]): Promise<Conversation> {
        const call = db.get(collectionName);
        let result =  await call.findOne({
            members :members
        },{
            projection :{chat :{$slice :[0,20]}}
        });
        if (!result){
            return await call.findOne({
                members :members.reverse()
            },{
                projection :{chat :{$slice :[0,20]}}
            });
        }
        return result;
    }

    static async findByMembersPageable(members : string[],start : number, end :number): Promise<Conversation> {
        const call = db.get(collectionName);
        let result =  await call.findOne({
            members :members
        },{
            projection :{chat :{$slice :[start,end]}}
        });
        if (!result){
            return await call.findOne({
                members :members.reverse()
            },{
                projection :{chat :{$slice :[start,end]}}
            });
        }
        return result;
    }




}
