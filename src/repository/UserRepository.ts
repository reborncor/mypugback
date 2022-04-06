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
    static async findById(id: string): Promise<User> {
        const call = db.get(collectionName);
        return await call.findOne({
            _id: id,
        });
    }
}