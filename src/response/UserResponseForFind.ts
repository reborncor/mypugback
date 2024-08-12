import { User } from "../models/User";
import { UserFactory } from "../models/UserFactory";

export interface UserResponseForFind extends UserFactory {}

export function userToUserResponseForFind(user: User): UserResponseForFind {
  return {
    username: user.username,
    profilePicture: user.profilePicture ?? "",
  };
}
