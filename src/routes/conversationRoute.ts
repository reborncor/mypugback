import { Router } from "express";
import { getAllConversationFromUser } from "../app/conversation/getConversations";
import { createConversation } from "../app/conversation/createConversation";
import { getConversationPageable } from "../app/conversation/getConversationPageable";

const conversationRouter = Router();

const getAllConversationPath = "/getconversations";
const createOrGetConversationPath = "/getconversation";
const getConversationPageablePath = "/getconversationpage";

conversationRouter.get(getConversationPageablePath, getConversationPageable);
conversationRouter.get(getAllConversationPath, getAllConversationFromUser);
conversationRouter.post(createOrGetConversationPath, createConversation);

export default conversationRouter;
