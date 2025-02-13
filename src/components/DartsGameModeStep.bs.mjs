// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Elo from "../helpers/Elo.bs.mjs";
import * as Stats from "../helpers/Stats.bs.mjs";
import * as React from "react";
import * as Button from "./Button.bs.mjs";
import * as Header from "./Header.bs.mjs";
import * as Players from "../helpers/Players.bs.mjs";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as DartsGames from "../helpers/DartsGames.bs.mjs";
import * as LoggerStep from "../helpers/LoggerStep.bs.mjs";
import * as Mattermost from "../helpers/Mattermost.bs.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.bs.mjs";
import * as Belt_MapString from "rescript/lib/es6/belt_MapString.js";
import * as JsxRuntime from "react/jsx-runtime";

var modes = [
  "M301",
  "M501",
  "Bullen",
  "Killer",
  "AroundTheClock"
];

function DartsGameModeStep(props) {
  var players = props.players;
  var setEarnedPoints = props.setEarnedPoints;
  var setStep = props.setStep;
  var selectedUsers = props.selectedUsers;
  var match = React.useState(function () {
        
      });
  var setDartMode = match[1];
  var dartMode = match[0];
  var match$1 = React.useState(function () {
        return false;
      });
  var setIsSaving = match$1[1];
  var modeButtons = modes.map(function (mode) {
        return JsxRuntime.jsx(Button.make, {
                    className: "w-[300px]",
                    variant: Caml_obj.equal(dartMode, mode) ? "Blue" : "Grey",
                    onClick: (function (param) {
                        setDartMode(function (param) {
                              return mode;
                            });
                      }),
                    children: DartsGames.dartsModeToString(mode)
                  }, DartsGames.dartsModeToString(mode));
      });
  var mapUser = function (extra) {
    var player = Players.playerByKey(players, extra);
    if (player !== undefined) {
      return JsxRuntime.jsx("li", {
                  children: player.name
                }, extra);
    } else {
      return JsxRuntime.jsx("li", {
                  children: "..."
                }, extra);
    }
  };
  var selectedBlueUsers = Belt_MapString.keysToArray(Belt_MapString.keep(selectedUsers, (function (param, value) {
              return value === "Blue";
            })));
  var selectedRedUsers = Belt_MapString.keysToArray(Belt_MapString.keep(selectedUsers, (function (param, value) {
              return value === "Red";
            })));
  var blueUsers = selectedBlueUsers.map(mapUser);
  var redUsers = selectedRedUsers.map(mapUser);
  var redPlayers = selectedRedUsers.map(function (key) {
        return Core__Option.getExn(Players.playerByKey(players, key), undefined);
      });
  var bluePlayers = selectedBlueUsers.map(function (key) {
        return Core__Option.getExn(Players.playerByKey(players, key), undefined);
      });
  var sendUpdate = function (extra, extra$1) {
    return Mattermost.sendDartsUpdate(bluePlayers, redPlayers, extra, extra$1);
  };
  var saveGame = async function () {
    setIsSaving(function (param) {
          return true;
        });
    await DartsGames.addDartsGame({
          winners: selectedBlueUsers,
          losers: selectedRedUsers,
          date: new Date(),
          mode: Core__Option.getExn(dartMode, undefined)
        });
    var bluePlayers = selectedBlueUsers.map(function (key) {
          return Core__Option.getExn(Players.playerByKey(players, key), undefined);
        });
    var redPlayers = selectedRedUsers.map(function (key) {
          return Core__Option.getExn(Players.playerByKey(players, key), undefined);
        });
    var match = Elo.calculateScore(bluePlayers, redPlayers, "Darts");
    var roundedPoints = Elo.roundScore(match[2]);
    setEarnedPoints(function (param) {
          return roundedPoints;
        });
    await Promise.all(match[0].map(async function (player) {
              return Players.updateDartsGameStats(player.key, 1, player.dartsElo);
            }));
    await Promise.all(match[1].map(async function (player) {
              return Players.updateDartsGameStats(player.key, 0, player.dartsElo);
            }));
    await Stats.updateDartsStats();
    await sendUpdate(roundedPoints, DartsGames.dartsModeToString(Core__Option.getOr(dartMode, "Unknown")));
    setIsSaving(function (param) {
          return false;
        });
    return setStep(function (step) {
                return LoggerStep.getNextStep(step);
              });
  };
  return JsxRuntime.jsxs(JsxRuntime.Fragment, {
              children: [
                JsxRuntime.jsx(Header.make, {
                      step: "ScoreForm",
                      onNextStep: (function () {
                          saveGame();
                        }),
                      onReset: props.reset,
                      disabled: match$1[0] || Core__Option.isNone(dartMode),
                      setShowQueueButtons: (function (param) {
                          
                        }),
                      gameMode: props.gameMode
                    }),
                JsxRuntime.jsxs("div", {
                      children: [
                        JsxRuntime.jsxs("div", {
                              children: [
                                JsxRuntime.jsx("h2", {
                                      children: "Gamemode",
                                      className: "font-bold text-3xl"
                                    }),
                                JsxRuntime.jsx("div", {
                                      children: modeButtons,
                                      className: "flex flex-col gap-4 pt-4"
                                    })
                              ]
                            }),
                        JsxRuntime.jsxs("div", {
                              children: [
                                JsxRuntime.jsx("h2", {
                                      children: "Winner",
                                      className: "font-bold text-3xl"
                                    }),
                                JsxRuntime.jsx("ol", {
                                      children: blueUsers,
                                      className: "pl-5 pt-4 pb-8 list-decimal text-2xl"
                                    })
                              ]
                            }),
                        JsxRuntime.jsxs("div", {
                              children: [
                                JsxRuntime.jsx("h2", {
                                      children: "Loser",
                                      className: "font-bold text-3xl"
                                    }),
                                JsxRuntime.jsx("ol", {
                                      children: redUsers,
                                      className: "pl-5 pt-4 pb-8 list-decimal text-2xl"
                                    })
                              ]
                            })
                      ],
                      className: "flex flex-wrap content-padding gap-20"
                    })
              ]
            });
}

var make = DartsGameModeStep;

export {
  make ,
}
/* Stats Not a pure module */
