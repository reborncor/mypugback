"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const checkdata_1 = require("../../../util/validator/checkdata");
const passwordManagement_1 = require("../../../util/security/passwordManagement");
const UserRepository_1 = __importDefault(require("../../../repository/UserRepository"));
const CustomError_1 = require("../../../util/error/CustomError");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, phoneNumber, password } = req.body;
    // console.log("DATA :", req.body)
    try {
        const user = yield signUpUser(email, username, password, phoneNumber);
        res.status(201).json({ code: user.code, message: user.message, payload: user.payload });
    }
    catch (err) {
        if (err instanceof CustomError_1.CustomError) {
            console.log(err);
            res.status(400).json({ message: err.message, code: err.code });
        }
        else {
            console.log(err);
        }
    }
});
exports.signUp = signUp;
const signUpUser = (email, username, password, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    (0, checkdata_1.checkThatUserSignUpCredentialsOrThrow)(email, password, phoneNumber, username);
    // const existingUser = await UserRepository.findByEmail(email);
    // const existingUserWithUserName = await UserRepository.findByUsername(username);
    // const existingUserWithPhoneNumber = await UserRepository.findByPhoneNumber(phoneNumber);
    // console.log("User : ",existingUser);
    // checkThatUserDoesntExistOrThrow(existingUser);
    // checkThatUserWithUsernameDoesntExistOrThrow(existingUserWithUserName);
    // checkThatUserWithPhoneNumberDoesntExistOrThrow(existingUserWithPhoneNumber);
    const hashedPassword = yield (0, passwordManagement_1.encodePassword)(password);
    const newUser = {
        admin: false, email, password: hashedPassword, phoneNumber, username, followersUser: [], followers: 0, following: 0,
    };
    yield UserRepository_1.default.insert(newUser);
    return {
        code: 0, message: "Inscription réalisée avec succès",
    };
});
