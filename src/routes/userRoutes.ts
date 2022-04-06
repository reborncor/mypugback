import {Router} from "express";
import {signUp} from "../app/auth/signup/SignUp";
import {signIn} from "../app/auth/signin/SignIn";
import {getUserInfo} from "../app/user/info/GetInfo";
import {getUserWithName} from "../app/user/info/GetInfoFromUser";
import {followUser} from "../app/user/follow/Follow";
import {unFollowUser} from "../app/user/unfollow/UnFollow";

const userRouter = Router();

const signUpPath = "/signup";
const signInPath = "/signin";
const infoPath = "/info";
const getPath = "/get";
const followPath = "/follow";
const unfollowPath = "/unfollow";

userRouter.post(signUpPath,signUp)
userRouter.post(signInPath,signIn)
userRouter.get(infoPath,getUserInfo)
userRouter.get(getPath,getUserWithName)

userRouter.put(followPath,followUser)
userRouter.put(unfollowPath,unFollowUser)

export default userRouter;
