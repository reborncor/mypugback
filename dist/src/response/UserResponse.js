"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToResponseProfile = exports.userToUserResponse = void 0;
function userToUserResponse(user) {
    var _a, _b, _c;
    return {
        username: user.username,
        email: user.email,
        admin: user.admin,
        phoneNumber: user.phoneNumber,
        followers: user.followers,
        following: user.following,
        password: "",
        profilePicture: (_a = user.profilePicture) !== null && _a !== void 0 ? _a : "",
        pugs: user.pugs,
        banned: (_b = user.banned) !== null && _b !== void 0 ? _b : false,
        description: (_c = user.description) !== null && _c !== void 0 ? _c : "",
    };
}
exports.userToUserResponse = userToUserResponse;
function userToResponseProfile(user, data) {
    var _a, _b, _c;
    return {
        username: user.username,
        email: user.email,
        admin: user.admin,
        phoneNumber: user.phoneNumber,
        followers: user.followers,
        following: user.following,
        password: "",
        pugs: user.pugs,
        profilePicture: (_a = user.profilePicture) !== null && _a !== void 0 ? _a : "",
        isFollowing: !!data,
        banned: (_b = user.banned) !== null && _b !== void 0 ? _b : false,
        description: (_c = user.description) !== null && _c !== void 0 ? _c : "",
    };
}
exports.userToResponseProfile = userToResponseProfile;
