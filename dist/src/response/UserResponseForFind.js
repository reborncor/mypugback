"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToUserResponseForFind = void 0;
function userToUserResponseForFind(user) {
    var _a;
    return {
        username: user.username,
        profilePicture: (_a = user.profilePicture) !== null && _a !== void 0 ? _a : "",
    };
}
exports.userToUserResponseForFind = userToUserResponseForFind;
