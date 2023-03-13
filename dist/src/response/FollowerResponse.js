"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followersToResponse = exports.followerToResponse = void 0;
function followerToResponse(follower) {
    var _a;
    return {
        profilePicture: (_a = follower.profilePicture) !== null && _a !== void 0 ? _a : "",
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
