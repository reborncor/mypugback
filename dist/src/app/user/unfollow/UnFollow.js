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
exports.unFollowUser = void 0;
const checkdata_1 = require("../../../util/validator/checkdata");
const UserRepository_1 = __importDefault(require("../../../repository/UserRepository"));
const CustomError_1 = require("../../../util/error/CustomError");
const tokenManagement_1 = require("../../../util/security/tokenManagement");
const FollowerRepository_1 = __importDefault(require("../../../repository/FollowerRepository"));
const UserFactoryResponse_1 = require("../../../response/UserFactoryResponse");
const unFollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        const { userId } = (0, tokenManagement_1.decodeToken)(token);
        const { username } = req.body;
        const user = yield execute(userId, username);
        res
            .status(200)
            .json({ code: user.code, message: user.message, payload: user.payload });
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
exports.unFollowUser = unFollowUser;
const execute = (userId, username) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findById(userId);
    const otherUser = yield UserRepository_1.default.findByUsername(username);
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    (0, checkdata_1.checkThatUserExistsOrThrow)(otherUser);
    const userNotFollow = yield FollowerRepository_1.default.findUserInFollwingList(currentUser.username, otherUser.username);
    (0, checkdata_1.checkThatUserNotFollowed)(userNotFollow);
    yield FollowerRepository_1.default.deleteUserFromFollowing(currentUser, (0, UserFactoryResponse_1.userToUserFactoryResponse)(otherUser));
    yield FollowerRepository_1.default.deleteUserFromFollower(otherUser, (0, UserFactoryResponse_1.userToUserFactoryResponse)(currentUser));
    yield UserRepository_1.default.updateUserFollowing(currentUser, -1);
    yield UserRepository_1.default.updateUserFollower(otherUser, -1);
    return {
        code: 0,
        message: "Nouvel utilisateur unfollow",
    };
});
