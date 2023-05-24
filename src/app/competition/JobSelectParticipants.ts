import moment from "moment";
import CompetitionRepository from "../../repository/CompetitionRepository";
import { Participant } from "../../models/Participant";
import { SelectedParticipant } from "../../models/SelectedParticipant";
import { ObjectId } from "bson";

const loadsh = require("lodash");

export const jobSelectParticipants = async () => {
  const date = moment().weekday(1).hour(12);
  const competiton = await CompetitionRepository.findByDate(date.unix());

  if (competiton && competiton.participants.length) {
    const participants: Participant[] = competiton.participants;
    const selectedManParticipants = getSelectedPaticipants(participants, "man");
    const selectedWomanParticipants = getSelectedPaticipants(
      participants,
      "woman"
    );
    return await CompetitionRepository.addSelectedParticipants(
      [...selectedManParticipants, ...selectedWomanParticipants],
      new ObjectId(competiton._id)
    );
  }
};

const getSelectedPaticipants = (
  participants: Participant[],
  sex: "man" | "woman"
): SelectedParticipant[] => {
  const filteredParticipant = participants.filter(
    (participant) => participant.sex == sex
  );
  return loadsh.sampleSize(filteredParticipant, 2);
};
