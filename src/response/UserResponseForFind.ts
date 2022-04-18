import {User} from "../models/User";
import UserResponse from "./UserResponse";


export interface UserResponseForFind {
    username : string;

}

export function userToUserResponseForFind(user : User): UserResponseForFind{

    return {
        username : user.username,
    }
}
