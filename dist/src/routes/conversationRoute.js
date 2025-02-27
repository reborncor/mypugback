"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getConversations_1 = require("../app/conversation/getConversations");
const createConversation_1 = require("../app/conversation/createConversation");
const getConversationPageable_1 = require("../app/conversation/getConversationPageable");
const conversationRouter = (0, express_1.Router)();
const getAllConversationPath = "/getconversations";
const createOrGetConversationPath = "/getconversation";
const getConversationPageablePath = "/getconversationpage";
conversationRouter.get(getConversationPageablePath, getConversationPageable_1.getConversationPageable);
conversationRouter.get(getAllConversationPath, getConversations_1.getAllConversationFromUser);
conversationRouter.post(createOrGetConversationPath, createConversation_1.createConversation);
exports.default = conversationRouter;
