import { Router } from "express";
import { getAllConversationFromUser } from "../app/conversation/getConversations";
import { createConversation } from "../app/conversation/createConversation";
import { getConversationPageable } from "../app/conversation/getConversationPageable";

const competition = Router();

const getAllCompetitionPath = "/all";
const getCompetitionPath = "/";
const getCompetitionWinnerPath = "/winner";
const particiaptePath = "/participate";
const votePath = "/vote";

competition.get(getAllCompetitionPath, getConversationPageable);
competition.get(getCompetitionPath, getAllConversationFromUser);
competition.get(getCompetitionWinnerPath, createConversation);
competition.put(particiaptePath, createConversation);

export default competition;
