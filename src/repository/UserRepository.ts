import {db} from "./db";
import {User} from "../models/User";

const collectionName = "users";

export default class UserRepository{
    static async insert(user: User): Promise<User> {
        const call = db.get(collectionName);
        return await call.insert(user);
    }

    static async findByUsername(username: string): Promise<User> {
        const call = db.get(collectionName);
        return await call.findOne({
            username,
        });
    }

    static async findUsersByUsername(username: string): Promise<User[]> {
        const call = db.get(collectionName);
        return await call.find({username: {$regex:  new RegExp('^'+username), $options : 'i'}}, );
    }
    static async findById(id: string): Promise<User> {
        const call = db.get(collectionName);
        return await call.findOne({
            _id: id,
        });
    }

    static async updateUserPug(user: User, numberOfPug : number): Promise<User> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $set:{pugs : user.pugs+numberOfPug}
            }
        );
    }
    static async updateUserFollower(user: User, number : number): Promise<User> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $set:{followers : user.followers+number}
            }
        );
    }
    static async updateUserFollowing(user: User, number : number): Promise<User> {
        const call = db.get(collectionName);
        return await call.findOneAndUpdate(
            {username: user.username},
            {
                $set:{following : user.following+number}
            }
        );
    }
}
