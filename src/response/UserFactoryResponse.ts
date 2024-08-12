import { User } from "../models/User";
import { UserFactory } from "../models/UserFactory";

export interface UserFactoryResponse extends UserFactory {}

export function userToUserFactoryResponse(user: User): UserFactoryResponse {
  return {
    username: user.username,
    profilePicture: user.profilePicture ?? "",
  };
}
export function userToUserFactoryResponseNoId(
  user: UserFactory
): UserFactoryResponse {
  return {
    username: user.username,
    profilePicture: user.profilePicture ?? "",
  };
}

export function usersToUsersFactoryResponse(
  userFactories: UserFactory[]
): UserFactory[] {
  const result: UserFactory[] = [];
  userFactories.forEach((value) =>
    result.push(userToUserFactoryResponseNoId(value))
  );
  return result;
}
