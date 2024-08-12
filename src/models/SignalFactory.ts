import { ObjectId } from "bson";
import { SignalReason } from "./SignalReason";

export interface SignalFactory {
  _id?: ObjectId;
  userId: ObjectId;
  username: string;
  reason: SignalReason;
  senderId: ObjectId;
  date: number;
}
