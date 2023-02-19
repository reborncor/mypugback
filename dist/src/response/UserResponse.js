"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToResponseProfile = exports.userToUserResponse = void 0;
function userToUserResponse(user) {
    return {
        username: user.username,
        email: user.email,
        admin: user.admin,
        phoneNumber: user.phoneNumber,
        followers: user.followers,
        following: user.following,
        password: "",
        pugs: user.pugs,
    };
}
exports.userToUserResponse = userToUserResponse;
function userToResponseProfile(user, data) {
    return {
        username: user.username,
        email: user.email,
        admin: user.admin,
        phoneNumber: user.phoneNumber,
        followers: user.followers,
        following: user.following,
        password: "",
        pugs: user.pugs,
        isFollowing: !!data,
    };
}
exports.userToResponseProfile = userToResponseProfile;
