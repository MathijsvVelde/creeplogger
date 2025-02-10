// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Cn from "rescript-classnames/src/Cn.bs.mjs";
import * as React from "react";
import * as Header from "./Header.bs.mjs";
import * as GridItem from "./GridItem.bs.mjs";
import * as LoggerStep from "../helpers/LoggerStep.bs.mjs";
import * as NewPlayerForm from "./NewPlayerForm.bs.mjs";
import * as Belt_MapString from "rescript/lib/es6/belt_MapString.js";
import * as JsxRuntime from "react/jsx-runtime";

function UserGrid(props) {
  var gameMode = props.gameMode;
  var setStep = props.setStep;
  var setSelectedUsers = props.setSelectedUsers;
  var selectedUsers = props.selectedUsers;
  var match = React.useState(function () {
        return false;
      });
  var showQueueButtons = match[0];
  var players = props.players.map(function (item) {
        var tmp;
        tmp = showQueueButtons ? JsxRuntime.jsxs("div", {
                children: [
                  JsxRuntime.jsx("button", {
                        children: "15m",
                        className: "bg-gray-400 border-none cursor-pointer text-3xl text-black rounded-bl ring-inset ring-white hover:ring",
                        onClick: (function (param) {
                            setSelectedUsers(function (s) {
                                  return Belt_MapString.set(s, item.key, "Blue");
                                });
                          })
                      }),
                  JsxRuntime.jsx("button", {
                        children: "30m",
                        className: "bg-gray-500 border-none cursor-pointer text-3xl text-black ring-inset ring-white hover:ring",
                        onClick: (function (param) {
                            setSelectedUsers(function (s) {
                                  return Belt_MapString.set(s, item.key, "Blue");
                                });
                          })
                      }),
                  JsxRuntime.jsx("button", {
                        children: "1h",
                        className: "bg-gray-600 border-none cursor-pointer text-3xl text-white ring-inset ring-white hover:ring",
                        onClick: (function (param) {
                            setSelectedUsers(function (s) {
                                  return Belt_MapString.set(s, item.key, "Blue");
                                });
                          })
                      }),
                  JsxRuntime.jsx("button", {
                        children: "2h",
                        className: "bg-gray-700 border-none cursor-pointer text-3xl text-white rounded-br ring-inset ring-white hover:ring",
                        onClick: (function (param) {
                            setSelectedUsers(function (s) {
                                  return Belt_MapString.set(s, item.key, "Blue");
                                });
                          })
                      })
                ],
                className: "grid grid-cols-4"
              }) : (
            gameMode === "Fussball" ? JsxRuntime.jsxs("div", {
                    children: [
                      JsxRuntime.jsx("button", {
                            children: "Blauw",
                            className: "bg-[#86b7ff] border-none cursor-pointer text-3xl rounded-bl text-black",
                            onClick: (function (param) {
                                setSelectedUsers(function (s) {
                                      return Belt_MapString.set(s, item.key, "Blue");
                                    });
                              })
                          }),
                      JsxRuntime.jsx("button", {
                            children: "Rood",
                            className: "bg-[#ff8686] border-none cursor-pointer text-3xl rounded-br text-black",
                            onClick: (function (param) {
                                setSelectedUsers(function (s) {
                                      return Belt_MapString.set(s, item.key, "Red");
                                    });
                              })
                          })
                    ],
                    className: "grid grid-cols-2"
                  }) : JsxRuntime.jsxs("div", {
                    children: [
                      JsxRuntime.jsx("button", {
                            children: "Winner",
                            className: "bg-green-400 border-none cursor-pointer text-3xl rounded-bl text-black",
                            onClick: (function (param) {
                                setSelectedUsers(function (s) {
                                      return Belt_MapString.set(s, item.key, "Blue");
                                    });
                              })
                          }),
                      JsxRuntime.jsx("button", {
                            children: "Loser",
                            className: "bg-[#ff8686] border-none cursor-pointer text-3xl rounded-br text-black",
                            onClick: (function (param) {
                                setSelectedUsers(function (s) {
                                      return Belt_MapString.set(s, item.key, "Red");
                                    });
                              })
                          })
                    ],
                    className: "grid grid-cols-2"
                  })
          );
        var match = Belt_MapString.get(selectedUsers, item.key);
        var tmp$1;
        tmp$1 = match !== undefined ? (
            match === "Blue" ? (
                gameMode === "Fussball" ? "ring-6 ring-blue" : "ring-6 ring-green-500"
              ) : "ring-6 ring-red"
          ) : "ring-0";
        return JsxRuntime.jsxs(GridItem.make, {
                    active: Belt_MapString.has(selectedUsers, item.key),
                    children: [
                      JsxRuntime.jsx("button", {
                            children: JsxRuntime.jsx("b", {
                                  children: item.name,
                                  className: "text-ellipsis max-w-full overflow-hidden inline-block p-2"
                                }),
                            className: "text-black text-3xl min-w-0 max-w-full",
                            onClick: (function (param) {
                                setSelectedUsers(function (s) {
                                      return Belt_MapString.remove(s, item.key);
                                    });
                              })
                          }),
                      tmp
                    ],
                    className: Cn.make([
                          "rounded bg-white grid grid-rows-user auto-rows-[1fr] h-[220px] transition-all relative",
                          tmp$1
                        ])
                  }, item.key);
      });
  return JsxRuntime.jsxs(JsxRuntime.Fragment, {
              children: [
                JsxRuntime.jsx(Header.make, {
                      step: "UserSelection",
                      onNextStep: (function () {
                          setStep(function (step) {
                                return LoggerStep.getNextStep(step);
                              });
                        }),
                      onReset: props.reset,
                      disabled: Belt_MapString.size(selectedUsers) <= 1,
                      setShowQueueButtons: match[1],
                      gameMode: gameMode,
                      setGameMode: props.setGameMode
                    }),
                JsxRuntime.jsxs("div", {
                      children: [
                        players,
                        JsxRuntime.jsx(GridItem.make, {
                              active: false,
                              children: JsxRuntime.jsx(NewPlayerForm.make, {})
                            })
                      ],
                      className: "grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-10 mt-8 content-padding"
                    })
              ]
            });
}

var make = UserGrid;

export {
  make ,
}
/* react Not a pure module */
