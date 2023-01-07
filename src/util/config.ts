import { load } from "ts-dotenv";

export const env = load({
  PORT: Number,
  JWTSECRET: String,
  DBURL: String,
});
