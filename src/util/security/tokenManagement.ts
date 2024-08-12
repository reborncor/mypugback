import { env } from "../config";
import { checkThatUserIsConnected } from "../validator/checkdata";
import { User } from "../../models/User";

const jwt = require("jsonwebtoken");

export function generateAccessToken(user: User) {
  return jwt.sign({ userId: user._id }, env.JWTSECRET, { expiresIn: "3600s" });
}

export function decodeToken(token: string) {
  checkThatUserIsConnected(token);
  return jwt.decode(token);
}
