import { SignalFactory } from "./SignalFactory";
import { ObjectId } from "bson";

export interface SignalPug extends SignalFactory {
  pugId: ObjectId;
}
