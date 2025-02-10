// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Elo from "./Elo.bs.mjs";
import * as Games from "./Games.bs.mjs";
import * as Rules from "./Rules.bs.mjs";
import * as React from "react";
import * as Schema from "./Schema.bs.mjs";
import * as Players from "./Players.bs.mjs";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Database from "./Database.bs.mjs";
import * as DartsGames from "./DartsGames.bs.mjs";
import * as Core__Array from "@rescript/core/src/Core__Array.bs.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.bs.mjs";
import * as RescriptCore from "@rescript/core/src/RescriptCore.bs.mjs";
import * as Database$1 from "firebase/database";

var statsSchema = Schema.object(function (s) {
      return {
              totalGames: s.fieldOr("games", Schema.$$int, 0),
              totalRedWins: s.fieldOr("redWins", Schema.$$int, 0),
              totalBlueWins: s.fieldOr("blueWins", Schema.$$int, 0),
              totalAbsoluteWins: s.fieldOr("absoluteWins", Schema.$$int, 0),
              totalDartsGames: s.fieldOr("dartsGames", Schema.$$int, 0)
            };
    });

var empty = {
  totalGames: 0,
  totalRedWins: 0,
  totalBlueWins: 0,
  totalAbsoluteWins: 0,
  totalDartsGames: 0
};

var bucket = "stats";

async function fetchStats() {
  var stats = await Database$1.get(Database$1.ref(Database.database, bucket));
  var stats$1 = stats.val();
  if (stats$1 == null) {
    return ;
  }
  var stats$2 = Schema.parseWith(stats$1, statsSchema);
  if (stats$2.TAG === "Ok") {
    return stats$2._0;
  }
  console.error(stats$2._0);
}

function useStats() {
  var match = React.useState(function () {
        return empty;
      });
  var setStats = match[1];
  var statsRef = Database$1.ref(Database.database, bucket);
  React.useEffect((function () {
          return Database$1.onValue(statsRef, (function (snapshot) {
                        var stats = snapshot.val();
                        if (stats == null) {
                          return ;
                        }
                        var stats$1 = Schema.parseWith(stats, statsSchema);
                        if (stats$1.TAG === "Ok") {
                          var stats$2 = stats$1._0;
                          return setStats(function (param) {
                                      return stats$2;
                                    });
                        }
                        console.error(stats$1._0);
                      }), undefined);
        }), []);
  return match[0];
}

async function updateStats(redScore, blueScore) {
  var blueWin = Rules.isBlueWin(redScore, blueScore);
  var redWin = Rules.isRedWin(redScore, blueScore);
  var isAbsolute = Rules.isAbsolute(redScore, blueScore);
  var statsRef = Database$1.ref(Database.database, bucket);
  return Database$1.runTransaction(statsRef, (function (data) {
                var data$1 = Schema.parseWith(data, statsSchema);
                if (data$1.TAG !== "Ok") {
                  return RescriptCore.panic("Failed parsing stats");
                }
                var data$2 = data$1._0;
                return Schema.reverseConvertToJsonWith({
                            totalGames: data$2.totalGames + 1 | 0,
                            totalRedWins: data$2.totalRedWins + (
                              redWin ? 1 : 0
                            ) | 0,
                            totalBlueWins: data$2.totalBlueWins + (
                              blueWin ? 1 : 0
                            ) | 0,
                            totalAbsoluteWins: data$2.totalAbsoluteWins + (
                              isAbsolute ? 1 : 0
                            ) | 0,
                            totalDartsGames: data$2.totalDartsGames
                          }, statsSchema);
              }));
}

async function updateDartsStats() {
  var statsRef = Database$1.ref(Database.database, bucket);
  return Database$1.runTransaction(statsRef, (function (data) {
                var data$1 = Schema.parseWith(data, statsSchema);
                if (data$1.TAG !== "Ok") {
                  return RescriptCore.panic("Failed parsing stats");
                }
                var data$2 = data$1._0;
                return Schema.reverseConvertToJsonWith({
                            totalGames: data$2.totalGames,
                            totalRedWins: data$2.totalRedWins,
                            totalBlueWins: data$2.totalBlueWins,
                            totalAbsoluteWins: data$2.totalAbsoluteWins,
                            totalDartsGames: data$2.totalDartsGames + 1 | 0
                          }, statsSchema);
              }));
}

async function writeStats(stats) {
  var statsRef = Database$1.ref(Database.database, bucket);
  var data = Schema.serializeWith(stats, statsSchema);
  var data$1;
  if (data.TAG === "Ok") {
    var data$2 = data._0;
    console.log("Log", data$2);
    data$1 = data$2;
  } else {
    data$1 = RescriptCore.panic("Could not serialize stats");
  }
  return await Database$1.set(statsRef, data$1);
}

async function recalculateStats() {
  var games = await Games.fetchAllGames();
  var dartsGames = await DartsGames.fetchAllGames();
  var players = await Players.fetchAllPlayers();
  var playerKeys = Object.keys(players);
  playerKeys.forEach(function (key) {
        var player = Core__Option.getExn(players[key], undefined);
        var newrecord = Caml_obj.obj_dup(player);
        newrecord.dartsLastGames = [];
        newrecord.dartsLosses = 0;
        newrecord.dartsWins = 0;
        newrecord.dartsGames = 0;
        newrecord.dartsLastEloChange = 0.0;
        newrecord.dartsElo = 1000.0;
        newrecord.lastGames = [];
        newrecord.lastEloChange = 0.0;
        newrecord.elo = 1000.0;
        newrecord.redWins = 0;
        newrecord.blueWins = 0;
        newrecord.redGames = 0;
        newrecord.blueGames = 0;
        newrecord.teamGoalsAgainst = 0;
        newrecord.teamGoals = 0;
        newrecord.games = 0;
        newrecord.absoluteLosses = 0;
        newrecord.absoluteWins = 0;
        newrecord.losses = 0;
        newrecord.wins = 0;
        players[key] = newrecord;
      });
  var stats = Core__Array.reduce(games, empty, (function (stats, game) {
          var blueWin = Rules.isBlueWin(game.redScore, game.blueScore);
          var redWin = Rules.isRedWin(game.redScore, game.blueScore);
          var isAbsolute = Rules.isAbsolute(game.redScore, game.blueScore);
          var redPlayers = game.redTeam.map(function (key) {
                return Core__Option.getExn(players[key], undefined);
              });
          var bluePlayers = game.blueTeam.map(function (key) {
                return Core__Option.getExn(players[key], undefined);
              });
          var match;
          if (blueWin) {
            match = Elo.calculateScore(bluePlayers, redPlayers, undefined);
          } else {
            var match$1 = Elo.calculateScore(redPlayers, bluePlayers, undefined);
            match = [
              match$1[1],
              match$1[0],
              match$1[2]
            ];
          }
          match[0].forEach(function (player) {
                var lastGames = Players.getLastGames(player.lastGames, blueWin);
                var newrecord = Caml_obj.obj_dup(player);
                newrecord.lastGames = lastGames;
                newrecord.blueWins = blueWin ? player.blueWins + 1 | 0 : player.blueWins;
                newrecord.blueGames = player.blueGames + 1 | 0;
                newrecord.teamGoalsAgainst = player.teamGoalsAgainst + game.redScore | 0;
                newrecord.teamGoals = player.teamGoals + game.blueScore | 0;
                newrecord.games = player.games + 1 | 0;
                newrecord.absoluteLosses = redWin && isAbsolute ? player.absoluteLosses + 1 | 0 : player.absoluteLosses;
                newrecord.absoluteWins = blueWin && isAbsolute ? player.absoluteWins + 1 | 0 : player.absoluteWins;
                newrecord.losses = redWin ? player.losses + 1 | 0 : player.losses;
                newrecord.wins = blueWin ? player.wins + 1 | 0 : player.wins;
                players[player.key] = newrecord;
              });
          match[1].forEach(function (player) {
                var lastGames = Players.getLastGames(player.lastGames, redWin);
                var newrecord = Caml_obj.obj_dup(player);
                newrecord.lastGames = lastGames;
                newrecord.redWins = redWin ? player.redWins + 1 | 0 : player.redWins;
                newrecord.redGames = player.redGames + 1 | 0;
                newrecord.teamGoalsAgainst = player.teamGoalsAgainst + game.blueScore | 0;
                newrecord.teamGoals = player.teamGoals + game.redScore | 0;
                newrecord.games = player.games + 1 | 0;
                newrecord.absoluteLosses = blueWin && isAbsolute ? player.absoluteLosses + 1 | 0 : player.absoluteLosses;
                newrecord.absoluteWins = redWin && isAbsolute ? player.absoluteWins + 1 | 0 : player.absoluteWins;
                newrecord.losses = blueWin ? player.losses + 1 | 0 : player.losses;
                newrecord.wins = redWin ? player.wins + 1 | 0 : player.wins;
                players[player.key] = newrecord;
              });
          return {
                  totalGames: stats.totalGames + 1 | 0,
                  totalRedWins: stats.totalRedWins + (
                    redWin ? 1 : 0
                  ) | 0,
                  totalBlueWins: stats.totalBlueWins + (
                    blueWin ? 1 : 0
                  ) | 0,
                  totalAbsoluteWins: stats.totalAbsoluteWins + (
                    isAbsolute ? 1 : 0
                  ) | 0,
                  totalDartsGames: stats.totalDartsGames
                };
        }));
  var stats$1 = Core__Array.reduce(dartsGames, stats, (function (stats, game) {
          var winners = game.winners.map(function (key) {
                return Core__Option.getExn(players[key], undefined);
              });
          var losers = game.losers.map(function (key) {
                return Core__Option.getExn(players[key], undefined);
              });
          var match = Elo.calculateScore(winners, losers, (function (player) {
                  return player.dartsElo;
                }));
          match[0].forEach(function (player) {
                var lastGames = Players.getLastGames(player.dartsLastGames, true);
                var newrecord = Caml_obj.obj_dup(player);
                newrecord.dartsLastGames = lastGames;
                newrecord.dartsWins = player.dartsWins + 1 | 0;
                newrecord.dartsGames = player.dartsGames + 1 | 0;
                newrecord.dartsLastEloChange = player.lastEloChange;
                newrecord.dartsElo = player.elo;
                players[player.key] = newrecord;
              });
          match[1].forEach(function (player) {
                var lastGames = Players.getLastGames(player.dartsLastGames, false);
                var newrecord = Caml_obj.obj_dup(player);
                newrecord.dartsLastGames = lastGames;
                newrecord.dartsLosses = player.dartsLosses + 1 | 0;
                newrecord.dartsGames = player.dartsGames + 1 | 0;
                newrecord.dartsLastEloChange = player.lastEloChange;
                newrecord.dartsElo = player.elo;
                players[player.key] = newrecord;
              });
          return {
                  totalGames: stats.totalGames,
                  totalRedWins: stats.totalRedWins,
                  totalBlueWins: stats.totalBlueWins,
                  totalAbsoluteWins: stats.totalAbsoluteWins,
                  totalDartsGames: stats.totalDartsGames + 1 | 0
                };
        }));
  console.log(stats$1);
  console.log(players);
  await Promise.all(playerKeys.map(function (key) {
            var player = Core__Option.getExn(players[key], undefined);
            return Players.writePlayer(player);
          }));
  await writeStats(stats$1);
  return stats$1;
}

export {
  statsSchema ,
  empty ,
  bucket ,
  fetchStats ,
  useStats ,
  updateStats ,
  updateDartsStats ,
  writeStats ,
  recalculateStats ,
}
/* statsSchema Not a pure module */
