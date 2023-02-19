import { User } from "../models/User";
import { UserFactory } from "../models/UserFactory";

export interface UserFactoryResponse extends UserFactory {}

export function userToUserFactoryResponse(user: User): UserFactoryResponse {
  return {
    username: user.username,
    profilePicture: user.profilePicture ?? "",
    _id: user._id,
  };
}
