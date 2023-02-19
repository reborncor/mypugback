"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const util_1 = require("../util");
class CustomError extends Error {
    constructor(code, msg, payload) {
        super(msg);
        this.code = util_1.errorCode;
        this.payload = null;
        this.code = code;
        this.payload = payload;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
