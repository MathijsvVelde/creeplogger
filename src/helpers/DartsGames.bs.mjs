// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Schema from "./Schema.bs.mjs";
import * as Database from "./Database.bs.mjs";
import * as RescriptCore from "@rescript/core/src/RescriptCore.bs.mjs";
import * as Database$1 from "firebase/database";

var dartsModeSchema = Schema.union([
      Schema.object(function (s) {
            s.tag("kind", "r");
            return "AroundTheClock";
          }),
      Schema.object(function (s) {
            s.tag("kind", "b");
            return "Bullen";
          }),
      Schema.object(function (s) {
            s.tag("kind", "k");
            return "Killer";
          }),
      Schema.object(function (s) {
            s.tag("kind", "5");
            return "M501";
          }),
      Schema.object(function (s) {
            s.tag("kind", "3");
            return "M301";
          })
    ]);

function dartsModeToString(dartsMode) {
  switch (dartsMode) {
    case "AroundTheClock" :
        return "Around the Cock";
    case "Bullen" :
        return "Bullen";
    case "Killer" :
        return "Killer";
    case "M501" :
        return "501";
    case "M301" :
        return "301";
    
  }
}

var dartsGameSchema = Schema.object(function (s) {
      return {
              winners: s.f("w", Schema.array(Schema.string)),
              losers: s.f("l", Schema.array(Schema.string)),
              date: s.f("d", Schema.transform(Schema.$$float, (function (param) {
                          return {
                                  p: (function (prim) {
                                      return new Date(prim);
                                    }),
                                  s: (function (prim) {
                                      return prim.getTime();
                                    })
                                };
                        }))),
              mode: s.f("m", dartsModeSchema)
            };
    });

function addDartsGame(dartsGame) {
  var dartsGamesRef = Database$1.ref(Database.database, "dartsGames");
  var data = Schema.serializeWith(dartsGame, dartsGameSchema);
  if (data.TAG === "Ok") {
    return Database$1.push(dartsGamesRef, data._0);
  } else {
    return RescriptCore.panic("Could not create darts game");
  }
}

async function fetchAllGames() {
  var games = await Database$1.get(Database$1.query(Database$1.ref(Database.database, "dartsGames"), Database$1.orderByChild("date")));
  var orderedGames = [];
  games.forEach(function (snap) {
        var val = snap.val();
        if (val == null) {
          return ;
        }
        var val$1 = Schema.parseWith(val, dartsGameSchema);
        if (val$1.TAG === "Ok") {
          orderedGames.push(val$1._0);
          return ;
        }
        console.log(val$1._0);
      });
  return orderedGames;
}

function removeGame(gameKey) {
  return Database$1.remove(Database$1.ref(Database.database, "dartsGames/" + gameKey));
}

var empty = {};

function useLastGames() {
  var match = React.useState(function () {
        return empty;
      });
  var setGames = match[1];
  var gamesRef = Database$1.query(Database$1.ref(Database.database, "dartsGames"), Database$1.orderByChild("date"));
  React.useEffect((function () {
          return Database$1.onValue(gamesRef, (function (snapshot) {
                        var val = snapshot.val();
                        var games;
                        if (val == null) {
                          games = empty;
                        } else {
                          var val$1 = Schema.parseWith(val, Schema.dict(dartsGameSchema));
                          if (val$1.TAG === "Ok") {
                            games = val$1._0;
                          } else {
                            console.log(val$1._0);
                            games = {};
                          }
                        }
                        setGames(function (param) {
                              return games;
                            });
                      }), undefined);
        }), [setGames]);
  return match[0];
}

export {
  addDartsGame ,
  dartsModeToString ,
  fetchAllGames ,
  removeGame ,
  useLastGames ,
}
/* dartsModeSchema Not a pure module */
