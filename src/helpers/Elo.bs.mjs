// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Core__Array from "@rescript/core/src/Core__Array.bs.mjs";

function getTotalEloFromTeam(team) {
  return Core__Array.reduce(team, 0.0, (function (acc, creeper) {
                return acc + creeper.elo;
              }));
}

function calculateScore(winners, losers) {
  var totalEloA = getTotalEloFromTeam(winners);
  var totalEloB = getTotalEloFromTeam(losers);
  var countA = winners.length;
  var countB = losers.length;
  var max = countA > countB ? countA : countB;
  var mulA = countA === max ? max : 1.5;
  var mulB = countB === max ? max : 1.5;
  var avgA = totalEloA / mulA;
  var avgB = totalEloB / mulB;
  var losersScore = avgB;
  var winnersScore = avgA;
  var expectedScoreWinners = 1.0 / (1.0 + Math.pow(10.0, (losersScore - winnersScore) / 400.0));
  var expectedScoreLosers = 1.0 / (1.0 + Math.pow(10.0, (winnersScore - losersScore) / 400.0));
  var winners$1 = winners.map(function (creeper) {
        var change = 32.0 * (1.0 - expectedScoreWinners);
        var elo = creeper.elo + change;
        return {
                name: creeper.name,
                wins: creeper.wins,
                losses: creeper.losses,
                absoluteWins: creeper.absoluteWins,
                absoluteLosses: creeper.absoluteLosses,
                games: creeper.games,
                teamGoals: creeper.teamGoals,
                teamGoalsAgainst: creeper.teamGoalsAgainst,
                blueGames: creeper.blueGames,
                redGames: creeper.redGames,
                blueWins: creeper.blueWins,
                redWins: creeper.redWins,
                elo: elo,
                lastEloChange: change,
                key: creeper.key,
                mattermostHandle: creeper.mattermostHandle,
                lastGames: creeper.lastGames
              };
      });
  var losers$1 = losers.map(function (creeper) {
        var change = 32.0 * (0.0 - expectedScoreLosers);
        var elo = creeper.elo + change;
        return {
                name: creeper.name,
                wins: creeper.wins,
                losses: creeper.losses,
                absoluteWins: creeper.absoluteWins,
                absoluteLosses: creeper.absoluteLosses,
                games: creeper.games,
                teamGoals: creeper.teamGoals,
                teamGoalsAgainst: creeper.teamGoalsAgainst,
                blueGames: creeper.blueGames,
                redGames: creeper.redGames,
                blueWins: creeper.blueWins,
                redWins: creeper.redWins,
                elo: elo,
                lastEloChange: change,
                key: creeper.key,
                mattermostHandle: creeper.mattermostHandle,
                lastGames: creeper.lastGames
              };
      });
  return [
          winners$1,
          losers$1,
          32.0 * (1.0 - expectedScoreWinners)
        ];
}

function roundScore(score) {
  return Math.round(score) | 0;
}

export {
  calculateScore ,
  roundScore ,
}
/* No side effect */
