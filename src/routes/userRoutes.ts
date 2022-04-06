import {Router} from "express";
import {signUp} from "../app/auth/signup/SignUp";
import {signIn} from "../app/auth/signin/SignIn";

const userRouter = Router();

const signUpPath = "/signup";
const signInPath = "/signin";

userRouter.post(signUpPath,signUp)
userRouter.post(signInPath,signIn)


export default userRouter;
