import { load } from "ts-dotenv";

export const env = load({
  PORT: Number,
  JWTSECRET: String,
  DBURL: String,
  STRIPE_SECRET_KEY: String,
  GMAIL_USER: String,
  GMAIL_PASS: String,
});
