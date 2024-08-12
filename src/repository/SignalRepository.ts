import { db } from "./db";
import { SignalFactory } from "../models/SignalFactory";

const collectionName = "signalusers";

export default class SignalUserRepository {
  static async insert(user: SignalFactory): Promise<SignalFactory> {
    const call = db.get(collectionName);
    return await call.insert(user);
  }

  static async findByUsername(username: string): Promise<SignalFactory[]> {
    const call = db.get(collectionName);
    return await call.find(
      {
        username,
      },
      { sort: { time: -1 } }
    );
  }

  static async findAll(): Promise<SignalFactory[]> {
    const call = db.get(collectionName);
    return await call.find();
  }

  static async findByUserId(userId: string): Promise<SignalFactory[]> {
    const call = db.get(collectionName);
    return await call.find({
      userId,
    });
  }

  static async findById(_id: string): Promise<SignalFactory> {
    const call = db.get(collectionName);
    return await call.findOne({
      _id,
    });
  }

  static async deleteSignal(_id: string): Promise<any> {
    const call = db.get(collectionName);
    return await call.remove({ _id });
  }
}
