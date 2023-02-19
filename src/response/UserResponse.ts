import { User } from "../models/User";

export default interface UserResponse extends User {
  isFollowing?: boolean;
}

export function userToUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    email: user.email,
    admin: user.admin,
    phoneNumber: user.phoneNumber,
    followers: user.followers,
    following: user.following,
    password: "",
    profilePicture: user.profilePicture ?? "",
    pugs: user.pugs,
  };
}

export function userToResponseProfile(user: User, data: any): UserResponse {
  return {
    username: user.username,
    email: user.email,
    admin: user.admin,
    phoneNumber: user.phoneNumber,
    followers: user.followers,
    following: user.following,
    password: "",
    pugs: user.pugs,
    profilePicture: user.profilePicture ?? "",
    isFollowing: !!data,
  };
}
