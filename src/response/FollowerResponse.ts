import {User} from "../models/User";
import UserResponse from "./UserResponse";
import {Follower} from "../models/Follower";


export interface FollowerResponse{
    username : string;

}

export function followerToResponse(follower : Follower): FollowerResponse{

    return {
        username : follower.username,
    }
}

export  function  followersToResponse(followers : Follower[]) : FollowerResponse[]{

    const result : FollowerResponse[] = [];
    followers.forEach(value => result.push(followerToResponse(value)))
    return result;

}
