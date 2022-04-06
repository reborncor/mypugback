"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkThatUserExistsOrThrow = exports.checkThatUserIsConnected = exports.checkThatPasswordsAreEqualsOrThrow = exports.checkThatUserSignInCredentialsOrThrow = exports.checkThatUserSignUpCredentialsOrThrow = void 0;
const util_1 = require("../util");
var awPhoneNumber = require('awesome-phonenumber');
const EmailValidator = __importStar(require("email-validator"));
const CustomError_1 = require("../error/CustomError");
const passwordManagement_1 = require("../security/passwordManagement");
function checkThatUserSignUpCredentialsOrThrow(email, password, phoneNumber, username) {
    const pn = new awPhoneNumber(phoneNumber, 'SE');
    if (!email || email == "" || !EmailValidator.validate(email)) {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.emailInvalid, {});
    }
    if (!password || password == "") {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.passwordInvalid, {});
    }
    if (!username || username == "") {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.usernameInvalid, {});
    }
    if (!pn.isValid()) {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.phoneNumberInvalid, {});
    }
}
exports.checkThatUserSignUpCredentialsOrThrow = checkThatUserSignUpCredentialsOrThrow;
function checkThatUserSignInCredentialsOrThrow(password, username) {
    if (!password || password == "") {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.passwordInvalid, {});
    }
    if (!username || username == "") {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.usernameInvalid, {});
    }
}
exports.checkThatUserSignInCredentialsOrThrow = checkThatUserSignInCredentialsOrThrow;
function checkThatPasswordsAreEqualsOrThrow(password, confirmedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield (0, passwordManagement_1.isSame)(confirmedPassword, password))) {
            throw new CustomError_1.CustomError(util_1.errorCode, util_1.wrongPassword, {});
        }
    });
}
exports.checkThatPasswordsAreEqualsOrThrow = checkThatPasswordsAreEqualsOrThrow;
function checkThatUserIsConnected(token) {
    if (token == "" || token == null) {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.accountNotConnected, {});
    }
}
exports.checkThatUserIsConnected = checkThatUserIsConnected;
function checkThatUserExistsOrThrow(user) {
    if (!user) {
        throw new CustomError_1.CustomError(util_1.errorCode, util_1.accountDoesntExist, {});
    }
}
exports.checkThatUserExistsOrThrow = checkThatUserExistsOrThrow;
