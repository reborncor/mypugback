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
exports.followUser = void 0;
const checkdata_1 = require("../../../util/validator/checkdata");
const UserRepository_1 = __importDefault(require("../../../repository/UserRepository"));
const CustomError_1 = require("../../../util/error/CustomError");
const tokenManagement_1 = require("../../../util/security/tokenManagement");
const FollowerRepository_1 = __importDefault(require("../../../repository/FollowerRepository"));
const bson_1 = require("bson");
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        const { userId } = (0, tokenManagement_1.decodeToken)(token);
        const { username } = req.body;
        const user = yield execute(userId, username);
        res.status(200).json({ code: user.code, message: user.message, payload: user.payload });
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
exports.followUser = followUser;
const execute = (userId, username) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findById(userId);
    const otherUser = yield UserRepository_1.default.findByUsername(username);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    (0, checkdata_1.checkThatUserExistsOrThrow)(otherUser);
    (0, checkdata_1.checkThatUserisntHimself)(currentUser, otherUser);
    const userAlreadyFollow = yield FollowerRepository_1.default.findUserInFollwingList(currentUser.username, otherUser.username);
    (0, checkdata_1.checkThatUserIsNotAlreadyFollow)(userAlreadyFollow);
    const id = new bson_1.ObjectId(otherUser._id);
    const follower = {
        _id: id, username: otherUser.username
    };
    const following = {
        _id: id, username: currentUser.username
    };
    yield FollowerRepository_1.default.addUserToFollowing(currentUser, follower);
    yield FollowerRepository_1.default.addUserToFollower(otherUser, following);
    yield UserRepository_1.default.updateUserFollower(otherUser, 1);
    yield UserRepository_1.default.updateUserFollowing(currentUser, 1);
    return {
        code: 0, message: "Nouvel utilisateur suivit"
    };
});
