"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getConversations_1 = require("../app/conversation/getConversations");
const createConversation_1 = require("../app/conversation/createConversation");
const getConversationPageable_1 = require("../app/conversation/getConversationPageable");
const competition = (0, express_1.Router)();
const getAllCompetitionPath = "/all";
const getCompetitionPath = "/";
const getCompetitionWinnerPath = "/winner";
const particiaptePath = "/participate";
const votePath = "/vote";
competition.get(
  getAllCompetitionPath,
  getConversationPageable_1.getConversationPageable
);
competition.get(
  getCompetitionPath,
  getConversations_1.getAllConversationFromUser
);
competition.get(
  getCompetitionWinnerPath,
  createConversation_1.createConversation
);
competition.put(particiaptePath, createConversation_1.createConversation);
exports.default = competition;
