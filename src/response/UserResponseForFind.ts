import { User } from "../models/User";

export interface UserResponseForFind {
  username: string;
  profilePicture: string;
}

export function userToUserResponseForFind(user: User): UserResponseForFind {
  return {
    username: user.username,
    profilePicture: user.profilePicture ?? "",
  };
}
