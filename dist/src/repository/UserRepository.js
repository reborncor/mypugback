"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const collectionName = "users";
class UserRepository {
  static insert(user) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.insert(user);
    });
  }
  static findByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOne({
        username,
      });
    });
  }
  static findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOne({
        email,
      });
    });
  }
  static findByPhoneNumber(phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOne({
        phoneNumber,
      });
    });
  }
  static findUsersByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.find({
        username: { $regex: new RegExp("^" + username), $options: "i" },
      });
    });
  }
  static findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOne({
        _id: id,
      });
    });
  }
  static updateUserPug(user, numberOfPug) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOneAndUpdate(
        { username: user.username },
        {
          $set: { pugs: user.pugs + numberOfPug },
        }
      );
    });
  }
  static updateUserFollower(user, number) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOneAndUpdate(
        { username: user.username },
        {
          $set: { followers: user.followers + number },
        }
      );
    });
  }
  static updateUserFollowing(user, number) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOneAndUpdate(
        { username: user.username },
        {
          $set: { following: user.following + number },
        }
      );
    });
  }
}
exports.default = UserRepository;
