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

    static async findById(id: string): Promise<any> {
        const call = db.get(collectionName);
        // return await call.distinct("pugs",{"pugs.id" : new ObjectId(id)});

        return await call.find({"pugs.id" : new ObjectId(id) },{projection :{"pugs": {$elemMatch :{id : new ObjectId(id)}}}});
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

    static async likeUserPug(user :User,pug : Pug): Promise<UserPug> {
        const call = db.get(collectionName);
         await call.findOneAndUpdate(
             {"pugs.id":pug.id},
            {
                $push:{"pugs.$.usersLike" : {$each :[user.username], $position:0},

                }
            }
        );
        return  await call.findOneAndUpdate(
            { "pugs.id":pug.id},
            {
                $set :{"pugs.$.like" : pug.like+1},

                }
        );
    }

    static async unLikePug(user :User,pug : Pug): Promise<UserPug> {
        const call = db.get(collectionName);
        await call.findOneAndUpdate(
            { "pugs.id":pug.id},
            {
                $pull:{"pugs.$.usersLike" : user.username},

            }
        );
        return  await call.findOneAndUpdate(
            {"pugs.id":pug.id},
            {
                $set :{"pugs.$.like" : pug.like-1},

            }
        );
    }

    static async findUserInPugLike(username : string,pug: Pug): Promise<any> {
        const call = db.get(collectionName);
        return await call.findOne(
            {"pugs.id":pug.id, "pugs.usersLike":username},

            {
                projection :{pugs : {projection :{ usersLike:username}}},

            }

        );
    }


    static async getAllPugsFromFollowing(usernames : string[]) : Promise<any>{

        const call = db.get(collectionName);
        //Avec ID
        // return await call.find({username : {$in :['alpha','beta']} },{fields :{'username':1}});

        //Sans ID
        return await call.distinct("pugs",{username : {$in :usernames} });

    }
}