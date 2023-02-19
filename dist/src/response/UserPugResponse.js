"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPugToResponseNoComment = exports.userPugToResponse = void 0;
const PugResponse_1 = require("./PugResponse");
function userPugToResponse(userPug, username) {
    const pugsResponse = [];
    userPug.pugs.forEach((value) => pugsResponse.push((0, PugResponse_1.pugToResponse)(value, username, userPug.username)));
    return {
        pugs: pugsResponse,
        username: userPug.username,
    };
}
exports.userPugToResponse = userPugToResponse;
function userPugToResponseNoComment(userPug, username, otherUser) {
    const pugsResponse = [];
    userPug.forEach((value) => pugsResponse.push((0, PugResponse_1.pugToResponseNoComment)(value.pug, username, value._id, value.numberOfComments)));
    return {
        pugs: pugsResponse,
        username: otherUser,
    };
}
exports.userPugToResponseNoComment = userPugToResponseNoComment;
