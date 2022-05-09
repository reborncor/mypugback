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
const collectionName = "pugs";
class PugRepository {
    static insert(user, pug) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            const newPug = { username: user.username, pugs: [pug] };
            return yield call.insert(newPug);
        });
    }
    static findById(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            // return await call.distinct("pugs",{"pugs.id" : new ObjectId(id)});
            return yield call.findOne({ "pugs.id": new bson_1.ObjectId(id), username: username }, { projection: { "pugs": { $elemMatch: { id: new bson_1.ObjectId(id) } } } });
        });
    }
    static findByIdWithCommentsOnly(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            // return await call.distinct("pugs",{"pugs.id" : new ObjectId(id)});
            // return await call.findOne({"pugs.id" : new ObjectId(id) , username : username}, {projection : {"pugs.comments":1}});
            return yield call.findOne({ "pugs.id": new bson_1.ObjectId(id), username: username }, { projection: { "pugs": { $elemMatch: { id: new bson_1.ObjectId(id) } } } });
        });
    }
    static addNewPug(user, pug) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            let result = yield call.findOneAndUpdate({ username: user.username }, {
                $push: { pugs: { $each: [pug], $position: 0 }
                }
            });
            if (!result) {
                result = yield this.insert(user, pug);
            }
            return result;
        });
    }
    static deletePug(user, pug) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            let result = yield call.findOneAndUpdate({ username: user.username, "pugs.id": new bson_1.ObjectId(pug.id) }, {
                $push: { pugs: { $each: [pug], $position: 0 }
                }
            });
            if (!result) {
                result = yield this.insert(user, pug);
            }
            return result;
        });
    }
    static getAllPugsFromUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOne({
                username,
            }, { projection: { "pugs.comments": { $slice: -1 }, } });
        });
    }
    static likeUserPug(user, pug, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            yield call.findOneAndUpdate({ "pugs.id": pug.id, username: username }, {
                $push: { "pugs.$.usersLike": user.username, }
            });
            return yield call.findOneAndUpdate({ "pugs.id": pug.id, username: username }, {
                $set: { "pugs.$.like": pug.like + 1 },
            });
        });
    }
    static commentUserPug(comment, pug, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOneAndUpdate({ "pugs.id": pug.id, username: username }, {
                $push: { "pugs.$.comments": comment },
            });
        });
    }
    static unLikePug(user, pug, pugName) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            yield call.findOneAndUpdate({ "pugs.id": pug.id, username: pugName }, {
                $pull: { "pugs.$.usersLike": user.username },
            });
            return yield call.findOneAndUpdate({ "pugs.id": pug.id, username: pugName }, {
                $set: { "pugs.$.like": pug.like - 1 },
            });
        });
    }
    static findUserInPugLike(username, pug, pugname) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOne({ pugs: { $elemMatch: { usersLike: username, id: new bson_1.ObjectId(pug.id) } }, username: pugname }, {
                projection: { "pugs.id": 1 },
            });
        });
    }
    static getAllPugsFromFollowing(usernames) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            //Avec ID
            // return await call.find({username : {$in :usernames} },{projection :{'pugs':1}, });
            return yield call.find({ username: { $in: usernames } }, { projection: { "pugs.comments": { $slice: -1 }, } });
            //Sans ID
            // return await call.distinct("pugs",{username : {$in :usernames} });
            // return  await call.aggregate([{$group : {}}])
        });
    }
    static getAllPugsFromFollowingPageable(usernames, startInd, endInd) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            //Avec ID
            // return await call.find({username : {$in :usernames} },{projection :{'pugs':1}, });
            return yield call.find({ username: { $in: usernames } }, {
                //"pugs.comments" :{$slice : -1},
                // projection : { "pugs" :{$slice :[startInd,endInd]}, }
                projection: { "pugs": { $slice: [startInd, endInd] }
                }
            });
            //Sans ID
            // return await call.distinct("pugs",{username : {$in :usernames} });
            // return  await call.aggregate([{$group : {}}])
        });
    }
}
exports.default = PugRepository;
