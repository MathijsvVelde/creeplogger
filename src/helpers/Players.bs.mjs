// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Database from "./Database.bs.mjs";
import * as PervasivesU from "rescript/lib/es6/pervasivesU.js";
import * as RescriptCore from "@rescript/core/src/RescriptCore.bs.mjs";
import * as S$RescriptSchema from "rescript-schema/src/S.bs.mjs";
import * as Database$1 from "firebase/database";

var bucket = "players";

var playerSchema = S$RescriptSchema.object(function (s) {
      return {
              name: s.f("name", S$RescriptSchema.string),
              wins: s.o("wins", S$RescriptSchema.$$int, 0),
              losses: s.o("losses", S$RescriptSchema.$$int, 0),
              absoluteWins: s.o("absoluteWins", S$RescriptSchema.$$int, 0),
              absoluteLosses: s.o("absoluteLosses", S$RescriptSchema.$$int, 0),
              games: s.o("games", S$RescriptSchema.$$int, 0),
              blueGames: s.o("blueGames", S$RescriptSchema.$$int, 0),
              redGames: s.o("redGames", S$RescriptSchema.$$int, 0),
              blueWins: s.o("blueWins", S$RescriptSchema.$$int, 0),
              redWins: s.o("redWins", S$RescriptSchema.$$int, 0),
              elo: s.o("elo", S$RescriptSchema.$$int, 1000),
              key: s.f("key", S$RescriptSchema.string),
              mattermostHandle: s.f("mh", S$RescriptSchema.transform(S$RescriptSchema.option(S$RescriptSchema.string), (function (param) {
                          return {
                                  p: (function (value) {
                                      return value;
                                    }),
                                  s: (function (value) {
                                      if (value !== undefined) {
                                        return value;
                                      } else {
                                        return null;
                                      }
                                    })
                                };
                        })))
            };
    });

var playersSchema = S$RescriptSchema.dict(playerSchema);

async function addPlayer(name) {
  var playersRef = Database$1.ref(Database.database, bucket);
  var data = S$RescriptSchema.serializeWith({
        name: name,
        wins: 0,
        losses: 0,
        absoluteWins: 0,
        absoluteLosses: 0,
        games: 0,
        blueGames: 0,
        redGames: 0,
        blueWins: 0,
        redWins: 0,
        elo: 1000,
        key: "",
        mattermostHandle: undefined
      }, playerSchema);
  var data$1;
  data$1 = data.TAG === "Ok" ? data._0 : RescriptCore.panic("Could not serialize player");
  var ref = await Database$1.push(playersRef, data$1);
  var key = ref.key;
  if (!(key == null)) {
    await Database$1.set(Database$1.ref(Database.database, bucket + "/" + key + "/key"), key);
  }
  return ref;
}

function useAllPlayers() {
  var match = React.useState(function () {
        return [];
      });
  var setPlayers = match[1];
  var playersRef = Database$1.query(Database$1.ref(Database.database, bucket), Database$1.orderByChild("games"));
  React.useEffect((function () {
          return Database$1.onValue(playersRef, (function (snapshot) {
                        var data = snapshot.val();
                        if (data == null) {
                          return setPlayers(function (param) {
                                      return [];
                                    });
                        }
                        var players = S$RescriptSchema.parseWith(data, playersSchema);
                        if (players.TAG === "Ok") {
                          var players$1 = players._0;
                          return setPlayers(function (param) {
                                      return Object.values(players$1);
                                    });
                        }
                        console.error(players._0);
                        setPlayers(function (param) {
                              return [];
                            });
                      }), undefined);
        }), []);
  return match[0];
}

async function fetchPlayerByKey(key) {
  var playerRef = Database$1.ref(Database.database, bucket + "/" + key);
  var data = await Database$1.get(playerRef);
  var player = data.val();
  if (player == null) {
    return ;
  }
  var player$1 = S$RescriptSchema.parseWith(player, playerSchema);
  if (player$1.TAG === "Ok") {
    return player$1._0;
  }
  console.error(player$1._0);
}

function playerByKey(players, key) {
  return players.find(function (c) {
              return c.key === key;
            });
}

function updateGameStats(key, pointsA, pointsB, team, elo) {
  var isAbsolute = PervasivesU.abs(pointsA - pointsB | 0) === 7;
  var isWin = pointsA > pointsB;
  var isAbsoluteWin = isAbsolute && isWin;
  var isLoss = pointsA < pointsB;
  var isAbsoluteLoss = isAbsolute && isLoss;
  var isRedWin = team === "Red" && isWin;
  var isBlueWin = team === "Blue" && isWin;
  var playerRef = Database$1.ref(Database.database, bucket + "/" + key);
  return Database$1.runTransaction(playerRef, (function (data) {
                var player = S$RescriptSchema.parseWith(data, playerSchema);
                if (player.TAG !== "Ok") {
                  return data;
                }
                var player$1 = player._0;
                var res = S$RescriptSchema.serializeWith({
                      name: player$1.name,
                      wins: isWin ? player$1.wins + 1 | 0 : player$1.wins,
                      losses: isLoss ? player$1.losses + 1 | 0 : player$1.losses,
                      absoluteWins: isAbsoluteWin ? player$1.absoluteWins + 1 | 0 : player$1.absoluteWins,
                      absoluteLosses: isAbsoluteLoss ? player$1.absoluteLosses + 1 | 0 : player$1.absoluteLosses,
                      games: player$1.games + 1 | 0,
                      blueGames: team === "Blue" ? player$1.blueGames + 1 | 0 : player$1.blueGames,
                      redGames: team === "Red" ? player$1.redGames + 1 | 0 : player$1.redGames,
                      blueWins: isBlueWin ? player$1.blueWins + 1 | 0 : player$1.blueWins,
                      redWins: isRedWin ? player$1.redWins + 1 | 0 : player$1.redWins,
                      elo: elo,
                      key: player$1.key,
                      mattermostHandle: player$1.mattermostHandle
                    }, playerSchema);
                if (res.TAG === "Ok") {
                  return res._0;
                } else {
                  return data;
                }
              }));
}

export {
  bucket ,
  playerSchema ,
  playersSchema ,
  addPlayer ,
  useAllPlayers ,
  fetchPlayerByKey ,
  playerByKey ,
  updateGameStats ,
}
/* playerSchema Not a pure module */
