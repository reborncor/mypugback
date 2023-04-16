import { ObjectId } from "bson";
import { Participant } from "./Participant";
import { SelectedParticipant } from "./SelectedParticipant";

export interface Competition {
  _id?: ObjectId;
  startDate: number;
  endDate: number;
  endVotingDate: number;
  participants: Participant[];
  selectedParticipants: SelectedParticipant[];
  winnerMan: ObjectId | null;
  pugWinnerMan: ObjectId | null;
  winnerWoman: ObjectId | null;
  pugWinnerWoman: ObjectId | null;
}
