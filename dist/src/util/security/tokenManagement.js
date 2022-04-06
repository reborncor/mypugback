"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateAccessToken = void 0;
const config_1 = require("../config");
const checkdata_1 = require("../validator/checkdata");
const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, config_1.env.JWTSECRET, { expiresIn: '3600s' });
}
exports.generateAccessToken = generateAccessToken;
function decodeToken(token) {
    (0, checkdata_1.checkThatUserIsConnected)(token);
    return jwt.decode(token);
}
exports.decodeToken = decodeToken;
