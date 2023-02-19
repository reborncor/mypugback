import { ObjectId } from "bson";

export interface SignalFactory {
  _id?: ObjectId;
  userId: ObjectId;
  username: string;
  reason: SignalReason;
  senderId: ObjectId;
  date: number;
}

export enum SignalReason {
  porncontent = "PORN_CONTENT",
  harasscontent = "HARASS_CONTENT",
  abusedcontent = "ABUSED_CONTENT",
  weaponcontent = "WEAPON_CONTENT",
  fakeaccount = "FAKE_ACCOUNT",
}
