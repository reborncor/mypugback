import {db} from "./db";
import {User} from "../models/User";
import {Pug} from "../models/Pug";
import {UserPug} from "../models/UserPug";
import {ObjectId} from "bson";
import {Comment} from "../models/Comment";

const collectionName = "pugs";

export default class PugRepository{
    static async insert(user :User,pug : Pug): Promise<UserPug> {
        const call = db.get(collectionName);
        const newPug : UserPug = {username: user.username, pugs : [pug]}
        return await call.insert(newPug);
    }

    static async findById(id: string, username : string): Promise<any> {
        const call = db.get(collectionName);
        // return await call.distinct("pugs",{"pugs.id" : new ObjectId(id)});

        return await call.findOne({"pugs.id" : new ObjectId(id) , username : username},{projection :{"pugs": {$elemMatch :{id : new ObjectId(id)}}}});
    }


    static async findByIdWithCommentsOnly(id: string, username : string): Promise<any> {
        const call = db.get(collectionName);
        // return await call.distinct("pugs",{"pugs.id" : new ObjectId(id)});
        // return await call.findOne({"pugs.id" : new ObjectId(id) , username : username}, {projection : {"pugs.comments":1}});
        return await call.findOne({"pugs.id" : new ObjectId(id) , username : username},{projection :{"pugs": {$elemMatch :{id : new ObjectId(id)}}}});

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

    static async deletePug( pug :Pug,username : string): Promise<UserPug> {
        const call = db.get(collectionName);
        return  await call.findOneAndUpdate(
            {pugs : {$elemMatch : { id : new ObjectId(pug.id)}}, username : username},
            {
                $pull:{pugs :  pug
                }
            }
        );
    }

    static async getAllPugsFromUser(username :string): Promise<UserPug> {
        const call = db.get(collectionName);
        return await call.findOne({
            username,

        },
            {projection : {"pugs.comments" :{$slice : -1}, }}
        );
    }

    static async likeUserPug(user :User,pug : Pug, username : string): Promise<UserPug> {
        const call = db.get(collectionName);
         await call.findOneAndUpdate(
             {"pugs.id":pug.id, username : username},
            {
                $push:{"pugs.$.usersLike" : user.username,}
            }
        );
        return  await call.findOneAndUpdate(
            { "pugs.id":pug.id, username : username},
            {
                $set :{"pugs.$.like" : pug.like+1},

                }
        );


    }

    static async commentUserPug(comment : Comment,pug : Pug, username : string): Promise<UserPug> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {"pugs.id":pug.id, username : username},
            {
                $push:{"pugs.$.comments" : comment},

            }
        );
    }

    static async unLikePug(user :User,pug : Pug, pugName : string): Promise<UserPug> {
        const call = db.get(collectionName);
        await call.findOneAndUpdate(
            { "pugs.id":pug.id, username : pugName},
            {
                $pull:{"pugs.$.usersLike" : user.username},

            }
        );
        return  await call.findOneAndUpdate(
            {"pugs.id":pug.id, username : pugName},
            {
                $set :{"pugs.$.like" : pug.like-1},

            }
        );
    }

    static async findUserInPugLike(username : string,pug: Pug, pugname : string): Promise<any> {
        const call = db.get(collectionName);
        return await call.findOne(
            {pugs : {$elemMatch : {usersLike : username, id : new ObjectId(pug.id)}}, username : pugname},
            {
                projection :{"pugs.id" : 1},
            }



        );
    }


    static async getAllPugsFromFollowing(usernames : string[]) : Promise<any>{

        const call = db.get(collectionName);
        //Avec ID
        // return await call.find({username : {$in :usernames} },{projection :{'pugs':1}, });
        return await call.find({username : {$in :usernames} },{projection : {"pugs.comments" :{$slice : -1}, }});

        //Sans ID
        // return await call.distinct("pugs",{username : {$in :usernames} });
        // return  await call.aggregate([{$group : {}}])

    }
    static async getAllPugsFromFollowingPageable(usernames : string[], startInd : number,endInd :number) : Promise<any>{

        const call = db.get(collectionName);
        //Avec ID
        // return await call.find({username : {$in :usernames} },{projection :{'pugs':1}, });
        return await call.find({username : {$in :usernames} },
            {
                //"pugs.comments" :{$slice : -1},
                // projection : { "pugs" :{$slice :[startInd,endInd]}, }
                projection : {"pugs" :{$slice :[startInd,endInd],  }  }
            });

        //Sans ID
        // return await call.distinct("pugs",{username : {$in :usernames} });
        // return  await call.aggregate([{$group : {}}])

    }

}


