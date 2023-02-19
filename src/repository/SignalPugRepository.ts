import { db } from "./db";
import { SignalPug } from "../models/SignalPug";
import { ObjectId } from "bson";

const collectionName = "signalpugs";

export default class SignalPugRepository {
  static async insert(signalFactory: SignalPug): Promise<SignalPug> {
    const call = db.get(collectionName);
    return await call.insert(signalFactory);
  }

  static async findByUsername(username: string): Promise<SignalPug[]> {
    const call = db.get(collectionName);
    return await call.find(
      {
        username,
      },
      { sort: { time: -1 } }
    );
  }

  static async findByUserId(userId: string): Promise<SignalPug[]> {
    const call = db.get(collectionName);
    return await call.find({
      userId,
    });
  }
  static async findByPugId(
    pugId: string,
    username: string
  ): Promise<SignalPug> {
    const call = db.get(collectionName);
    return await call.findOne({
      pugId: new ObjectId(pugId),
      username: username,
    });
  }

  static async findAll(): Promise<SignalPug[]> {
    const call = db.get(collectionName);
    return await call.find();
  }

  static async findById(_id: string): Promise<SignalPug> {
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
