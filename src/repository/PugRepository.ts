import {db} from "./db";
import {User} from "../models/User";
import {Pug} from "../models/Pug";
import {UserPug} from "../models/UserPug";
import {ObjectId} from "bson";

const collectionName = "pugs";

export default class PugRepository{
    static async insert(user :User,pug : Pug): Promise<UserPug> {
        const call = db.get(collectionName);
        const newPug : UserPug = {username: user.username, pugs : [pug]}
        return await call.insert(newPug);
    }

    static async addNewPug(user: User, pug :Pug): Promise<UserPug> {
        const call = db.get(collectionName);
        let result =  await call.findOneAndUpdate(
            {username: user.username},
            {
                $push:{pugs : {$each :[pug], $position:0}
                }
            }
        );
        if(!result){
           result =  await this.insert(user, pug)
        }
        return result;
    }

    static async getAllPugsFromUser(username :string): Promise<UserPug> {
        const call = db.get(collectionName);
        return await call.findOne({
            username,
        });
    }
}