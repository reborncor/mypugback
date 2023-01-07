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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const CustomError_1 = require("../../util/error/CustomError");
const UserRepository_1 = __importDefault(
  require("../../repository/UserRepository")
);
const checkdata_1 = require("../../util/validator/checkdata");
const ConversationRepository_1 = __importDefault(
  require("../../repository/ConversationRepository")
);
const util_1 = require("../../util/util");
const bson_1 = require("bson");
const moment_1 = __importDefault(require("moment"));
const sendMessage = (currentUsername, receiverUsername, content) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const message = yield execute(currentUsername, receiverUsername, content);
      return { message, code: util_1.successCode };
    } catch (err) {
      if (err instanceof CustomError_1.CustomError) {
        console.log(err);
        return { message: err.message, code: err.code };
      } else {
        console.log(err);
      }
    }
  });
exports.sendMessage = sendMessage;
const execute = (currentUsername, receiverUsername, content) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield UserRepository_1.default.findByUsername(
      currentUsername
    );
    const receiverUser = yield UserRepository_1.default.findByUsername(
      receiverUsername
    );
    (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
    (0, checkdata_1.checkThatUserExistsOrThrow)(receiverUser);
    (0, checkdata_1.checkThatUserIsLucie)(receiverUser);
    const conversation = yield ConversationRepository_1.default.findByMembers([
      currentUser.username,
      receiverUser.username,
    ]);
    const time = (0, moment_1.default)().unix().toString();
    const message = {
      content,
      time,
      senderUsername: currentUser.username,
      receiverUsername: receiverUsername,
      _id: new bson_1.ObjectId(),
    };
    yield ConversationRepository_1.default.addMessageToConversation(
      message,
      conversation
    );
    yield ConversationRepository_1.default.updateConversationOnNotSeen(
      conversation,
      receiverUser
    );
    return message;
  });
