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
const collectionName = "pugs";
class PugRepository {
    static insert(user, pug) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            const newPug = { username: user.username, pugs: [pug] };
            return yield call.insert(newPug);
        });
    }
    static addNewPug(user, pug) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            const result = yield call.findOneAndUpdate({ username: user.username }, {
                $push: { pugs: pug
                }
            });
            if (!result) {
                return yield this.insert(user, pug);
            }
            return result;
        });
    }
    static getAllPugsFromUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOne({
                username,
            });
        });
    }
}
exports.default = PugRepository;
