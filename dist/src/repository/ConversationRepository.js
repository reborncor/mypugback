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
const MessageResponse_1 = require("../response/MessageResponse");
const collectionName = "conversations";
class ConversationRepository {
    static insert(conversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.insert(conversation);
        });
    }
    static addMessageToConversation(message, conversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            let result = yield call.findOneAndUpdate({ members: conversation.members }, {
                $push: {
                    chat: { $each: [(0, MessageResponse_1.messageToResponse)(message)], $position: 0 },
                },
            });
            if (!result) {
                yield call.findOneAndUpdate({ members: conversation.members.reverse() }, {
                    $push: {
                        chat: { $each: [(0, MessageResponse_1.messageToResponse)(message)], $position: 0 },
                    },
                });
            }
            return result;
        });
    }
    static updateConversationOnSeen(conversation, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOneAndUpdate({ members: conversation.members, seen: { $ne: user.username } }, {
                $push: {
                    seen: user.username,
                },
            });
        });
    }
    static updateConversationOnNotSeen(conversation, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.findOneAndUpdate({ members: conversation.members }, {
                $pull: {
                    seen: user.username,
                },
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
    static findAllConversationsFromUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            return yield call.find({
                members: username,
            }, {
                projection: { chat: { $slice: [0, 1] } },
            });
        });
    }
    static findByMembers(members) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            let result = yield call.findOne({
                members: members,
            }, {
                projection: { chat: { $slice: [0, 20] } },
            });
            if (!result) {
                return yield call.findOne({
                    members: members.reverse(),
                }, {
                    projection: { chat: { $slice: [0, 20] } },
                });
            }
            return result;
        });
    }
    static findByMembersPageable(members, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const call = db_1.db.get(collectionName);
            let result = yield call.findOne({
                members: members,
            }, {
                projection: { chat: { $slice: [start, end] } },
            });
            if (!result) {
                return yield call.findOne({
                    members: members.reverse(),
                }, {
                    projection: { chat: { $slice: [start, end] } },
                });
            }
            return result;
        });
    }
}
exports.default = ConversationRepository;
