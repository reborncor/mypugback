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
const collectionName = "competitions";

class CompetitionRepository {
  static insert(competition) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.insert(competition);
    });
  }

  static findByDate(startDate) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOne({
        startDate,
      });
    });
  }

  static findAll() {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.find();
    });
  }

  static findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOne({
        id,
      });
    });
  }

  static addParticipant(participant, id) {
    return __awaiter(this, void 0, void 0, function* () {
      const call = db_1.db.get(collectionName);
      return yield call.findOneAndUpdate(
        { _id: id },
        {
          $push: { participants: participant },
        }
      );
    });
  }
}

exports.default = CompetitionRepository;
