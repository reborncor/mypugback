"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const bson_1 = require("bson");
const collectionName = "signalpugs";
class SignalPugRepository {
    static insert(signalFactory) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.insert(signalFactory);
        });
    }
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.find({
                username,
            }, { sort: { time: -1 } });
        });
    }
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.find({
                userId,
            });
        });
    }
    static findByPugId(pugId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOne({
                pugId: new bson_1.ObjectId(pugId),
                username: username,
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.find();
        });
    }
    static findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOne({
                _id,
            });
        });
    }
    static deleteSignal(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.remove({ _id });
        });
    }
}
exports.default = SignalPugRepository;
