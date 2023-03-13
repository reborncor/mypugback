"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersToUsersFactoryResponse = exports.userToUserFactoryResponseNoId = exports.userToUserFactoryResponse = void 0;
function userToUserFactoryResponse(user) {
    var _a;
    return {
        username: user.username,
        profilePicture: (_a = user.profilePicture) !== null && _a !== void 0 ? _a : "",
    };
}
exports.userToUserFactoryResponse = userToUserFactoryResponse;
function userToUserFactoryResponseNoId(user) {
    var _a;
    return {
        username: user.username,
        profilePicture: (_a = user.profilePicture) !== null && _a !== void 0 ? _a : "",
    };
}
exports.userToUserFactoryResponseNoId = userToUserFactoryResponseNoId;
function usersToUsersFactoryResponse(userFactories) {
    const result = [];
    userFactories.forEach((value) => result.push(userToUserFactoryResponseNoId(value)));
    return result;
}
exports.usersToUsersFactoryResponse = usersToUsersFactoryResponse;
