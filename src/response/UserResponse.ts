import {ObjectId} from "bson";
import {User} from "../models/User";


export default interface UserResponse extends  User{

}

export function userToUserResponse(user : User): UserResponse{

    return {
        username : user.username,
        email : user.email,
        admin : user.admin,
        phoneNumber : user.phoneNumber,
        followers: user.followers, following: user.following,
        password: "",
        pugs : user.pugs,
    }
}
