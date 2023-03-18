"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.competitionsToResponse = exports.competitionToResponse = void 0;
function competitionToResponse(competition) {
  return Object.assign({}, competition);
}
exports.competitionToResponse = competitionToResponse;
function competitionsToResponse(competitions) {
  const result = [];
  competitions.forEach((elem) => result.push(competitionToResponse(elem)));
  return result;
}
exports.competitionsToResponse = competitionsToResponse;
