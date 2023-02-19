import { UserFactory } from "../models/UserFactory";

export interface FollowerResponse extends UserFactory {}

export function followerToResponse(follower: UserFactory): FollowerResponse {
  return {
    profilePicture: follower.profilePicture ?? "",
    username: follower.username,
  };
}

export function followersToResponse(
  followers: UserFactory[]
): FollowerResponse[] {
  const result: FollowerResponse[] = [];
  followers.forEach((value) => result.push(followerToResponse(value)));
  return result;
}
