"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followersToResponse = exports.followerToResponse = void 0;
function followerToResponse(follower) {
  return {
    username: follower.username,
  };
}
exports.followerToResponse = followerToResponse;
function followersToResponse(followers) {
  const result = [];
  followers.forEach((value) => result.push(followerToResponse(value)));
  return result;
}
exports.followersToResponse = followersToResponse;
