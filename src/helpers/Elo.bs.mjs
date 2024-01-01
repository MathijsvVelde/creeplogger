// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Core__Array from "@rescript/core/src/Core__Array.bs.mjs";

function getTotalEloFromTeam(team) {
  return Core__Array.reduce(team, 0.0, (function (acc, creeper) {
                return acc + creeper.elo;
              }));
}

function getCombinedTeamScores(teamA, teamB) {
  var totalEloA = getTotalEloFromTeam(teamA);
  var totalEloB = getTotalEloFromTeam(teamB);
  var avgA = totalEloA / teamB.length;
  var avgB = totalEloB / teamA.length;
  return [
          avgA,
          avgB
        ];
}

function getExpected(scoreA, scoreB) {
  return 1.0 / (1.0 + Math.pow(10.0, (scoreB - scoreA) / 400.0));
}

function getRatingDelta(expected, actual) {
  return 32.0 * (actual - expected);
}

function updateRating(expected, actual, current) {
  return Math.round(current + 32.0 * (actual - expected)) | 0;
}

function calculateScore(winners, losers) {
  var match = getCombinedTeamScores(winners, losers);
  var expectedWinners = getExpected(match[0], match[1]);
  var winners$1 = winners.map(function (creeper) {
        var elo = updateRating(expectedWinners, 1.0, creeper.elo);
        return {
                name: creeper.name,
                wins: creeper.wins,
                losses: creeper.losses,
                absoluteWins: creeper.absoluteWins,
                absoluteLosses: creeper.absoluteLosses,
                games: creeper.games,
                blueGames: creeper.blueGames,
                redGames: creeper.redGames,
                blueWins: creeper.blueWins,
                redWins: creeper.redWins,
                elo: elo,
                key: creeper.key,
                mattermostHandle: creeper.mattermostHandle
              };
      });
  var losers$1 = losers.map(function (creeper) {
        var elo = updateRating(expectedWinners, 0.0, creeper.elo);
        return {
                name: creeper.name,
                wins: creeper.wins,
                losses: creeper.losses,
                absoluteWins: creeper.absoluteWins,
                absoluteLosses: creeper.absoluteLosses,
                games: creeper.games,
                blueGames: creeper.blueGames,
                redGames: creeper.redGames,
                blueWins: creeper.blueWins,
                redWins: creeper.redWins,
                elo: elo,
                key: creeper.key,
                mattermostHandle: creeper.mattermostHandle
              };
      });
  return [
          winners$1,
          losers$1,
          32.0 * (1.0 - expectedWinners) | 0
        ];
}

export {
  getTotalEloFromTeam ,
  getCombinedTeamScores ,
  getExpected ,
  getRatingDelta ,
  updateRating ,
  calculateScore ,
}
/* No side effect */
