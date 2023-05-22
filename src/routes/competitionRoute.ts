import { Router } from "express";
import { createConversation } from "../app/conversation/createConversation";
import { participateToCompetition } from "../app/competition/Participate";
import { getCompetition } from "../app/competition/GetCompetition";
import { getCompetitionByid } from "../app/competition/GetCompetitionById";

const competition = Router();

const getAllCompetitionPath = "/all";
const getCompetitionPath = "/";
const getCompetitionByIdPath = "/:id";
const getCompetitionWinnerPath = "/winner";
const particiaptePath = "/participate";

competition.get(getCompetitionPath, getCompetition);
competition.get(getCompetitionByIdPath, getCompetitionByid);
competition.get(getCompetitionWinnerPath, createConversation);
competition.put(particiaptePath, participateToCompetition);

export default competition;
