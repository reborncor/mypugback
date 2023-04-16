import { Competition } from "../models/Competition";

export interface CompetitionResponse extends Competition {}

export function competitionToResponse(
  competition: Competition
): CompetitionResponse {
  return {
    ...competition,
  };
}

export function competitionsToResponse(
  competitions: Competition[]
): CompetitionResponse[] {
  const result: CompetitionResponse[] = [];
  competitions.forEach((elem) => result.push(competitionToResponse(elem)));
  return result;
}
