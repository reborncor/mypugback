"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPugToResponse = void 0;
const PugResponse_1 = require("./PugResponse");
function userPugToResponse(userPug) {
    const pugsResponse = [];
    userPug.pugs.forEach(value => pugsResponse.push((0, PugResponse_1.pugToResponse)(value)));
    return {
        pugs: pugsResponse,
        username: userPug.username
    };
}
exports.userPugToResponse = userPugToResponse;
