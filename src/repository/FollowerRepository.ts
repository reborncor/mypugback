import {db} from "./db";
import {User} from "../models/User";
import {Follower} from "../models/Follower";
import {FollowingFollowerModel} from "../models/FollowingFollowerModel";

const collectionName = "userfriends";

export default class FollowerRepository {
    static async insert(model: FollowingFollowerModel): Promise<FollowingFollowerModel> {
        const call = db.get(collectionName);
        return await call.insert(model);
    }

    static async findByUsername(username: string): Promise<FollowingFollowerModel> {
        const call = db.get(collectionName);
        return await call.findOne({
            username,
        });
    }
    static async findById(id: string): Promise<FollowingFollowerModel> {
        const call = db.get(collectionName);
        return await call.findOne({
            _id: id,
        });
    }

    static async addUserToFollowing(user: User, follower : Follower): Promise<any> {
        const exist = await this.findByUsername(user.username);
        if(!exist){
            const dataset : FollowingFollowerModel = {following :  [], followers : [], username : user.username}
            await this.insert(dataset);
        }
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $push:{following : follower
                }
            }
        );
    }
    static async addUserToFollower(user: User, follower : Follower): Promise<any> {
        const exist = await this.findByUsername(user.username);
        if(!exist){
            const dataset : FollowingFollowerModel = {following :  [], followers : [], username : user.username}
            await this.insert(dataset);
        }
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $push:{followers : follower
                }
            }
        );
    }

    static async deleteUserFromFollowing(user: User, follower : Follower): Promise<any> {
        const call = db.get(collectionName);

        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $pull:{following : follower
                }
            }
        );
    }
    static async deleteUserFromFollower(user: User, follower : Follower): Promise<any> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $pull:{followers : follower
                }
            }
        );
    }

    static async findAllFollowersFromUser(username : string): Promise<any> {
        const call = db.get(collectionName);
        return await call.distinct("followers",{"username":username})
    }
    static async findAllFollowingFromUser(username : string): Promise<any> {
        const call = db.get(collectionName);
        return await call.distinct("following",{"username":username})
    }

    static async findUserInFollwingList(username : string,userToFollow : string): Promise<any> {
        const call = db.get(collectionName);
        return await call.findOne(
            {
                username,"following.username":userToFollow
            },{
                projection : {following : {$elemMatch: {username : userToFollow}}}
            }

        );
    }


}
