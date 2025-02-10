// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Games from "../../helpers/Games.bs.mjs";
import * as Stats from "../../helpers/Stats.bs.mjs";
import * as React from "react";
import * as Button from "../../components/Button.bs.mjs";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Players from "../../helpers/Players.bs.mjs";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Database from "../../helpers/Database.bs.mjs";
import * as LoginForm from "./LoginForm.bs.mjs";
import Link from "next/link";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.bs.mjs";
import * as Auth from "firebase/auth";
import * as JsxRuntime from "react/jsx-runtime";

function Admin(props) {
  var user = Database.useUser();
  var match = React.useState(function () {
        return "";
      });
  var setUpdate = match[1];
  var players = Players.useAllPlayers(undefined, undefined);
  var games = Games.useLastGames();
  var content;
  if (user === null || user === undefined) {
    content = JsxRuntime.jsx(LoginForm.make, {});
  } else {
    var email = Core__Option.getOr(Caml_option.nullable_to_opt(user.email), "??@??");
    var name = Core__Option.getOr(Caml_option.nullable_to_opt(user.displayName), email);
    content = JsxRuntime.jsxs("div", {
          children: [
            "Welcome, " + name,
            JsxRuntime.jsx("h2", {
                  children: "Actions",
                  className: "py-2 text-xl font-semibold"
                }),
            JsxRuntime.jsx("div", {
                  children: match[0],
                  className: "text-green-300 py-2"
                }),
            JsxRuntime.jsxs("div", {
                  children: [
                    JsxRuntime.jsx(Button.make, {
                          variant: "Grey",
                          onClick: (function (param) {
                              setUpdate(function (param) {
                                    return "Recalculating...";
                                  });
                              Stats.recalculateStats().then(function (param) {
                                    setUpdate(function (param) {
                                          return "Recalculating finished";
                                        });
                                    return Promise.resolve();
                                  });
                            }),
                          children: "Recalculate scores & stats"
                        }),
                    JsxRuntime.jsx(Button.make, {
                          variant: "Grey",
                          onClick: (function (param) {
                              Auth.signOut(Database.auth);
                            }),
                          children: "Logout"
                        })
                  ],
                  className: "flex gap-4"
                }),
            JsxRuntime.jsxs("details", {
                  children: [
                    JsxRuntime.jsx("summary", {
                          children: "Players",
                          className: "p-2 bg-white/5 mt-2 hover:bg-white/10 select-none rounded"
                        }),
                    JsxRuntime.jsxs("table", {
                          children: [
                            JsxRuntime.jsx("thead", {
                                  children: JsxRuntime.jsxs("tr", {
                                        children: [
                                          JsxRuntime.jsx("th", {
                                                children: "Name"
                                              }),
                                          JsxRuntime.jsx("th", {
                                                children: "Mattermost Handle"
                                              }),
                                          JsxRuntime.jsx("th", {
                                                children: "Actions"
                                              })
                                        ]
                                      })
                                }),
                            JsxRuntime.jsx("tbody", {
                                  children: players.map(function (player) {
                                        return JsxRuntime.jsxs("tr", {
                                                    children: [
                                                      JsxRuntime.jsx("td", {
                                                            children: player.name,
                                                            className: "px-2 py-1"
                                                          }),
                                                      JsxRuntime.jsx("td", {
                                                            children: Core__Option.getOr(player.mattermostHandle, "Undefined"),
                                                            className: "px-2 py-1"
                                                          }),
                                                      JsxRuntime.jsxs("td", {
                                                            children: [
                                                              JsxRuntime.jsx("button", {
                                                                    children: "Set MH",
                                                                    className: "bg-slate-300 rounded py-1 px-3 text-black",
                                                                    onClick: (function (param) {
                                                                        var handle = prompt("New handle");
                                                                        var newrecord = Caml_obj.obj_dup(player);
                                                                        Players.writePlayer((newrecord.mattermostHandle = (handle == null) ? undefined : Caml_option.some(handle), newrecord));
                                                                      })
                                                                  }),
                                                              JsxRuntime.jsx("button", {
                                                                    children: "Remove",
                                                                    className: "bg-slate-300 rounded py-1 px-3 text-black",
                                                                    onClick: (function (param) {
                                                                        if (confirm("Are you sure you want to remove " + player.name + "?")) {
                                                                          Players.removePlayer(player.key);
                                                                          return ;
                                                                        }
                                                                        
                                                                      })
                                                                  })
                                                            ],
                                                            className: "px-2 py-1 flex gap-2"
                                                          })
                                                    ]
                                                  }, player.key);
                                      })
                                })
                          ]
                        })
                  ]
                }),
            JsxRuntime.jsxs("details", {
                  children: [
                    JsxRuntime.jsx("summary", {
                          children: "Last games",
                          className: "p-2 bg-white/5 mt-2 hover:bg-white/10 select-none rounded"
                        }),
                    JsxRuntime.jsxs("table", {
                          children: [
                            JsxRuntime.jsx("thead", {
                                  children: JsxRuntime.jsxs("tr", {
                                        children: [
                                          JsxRuntime.jsx("th", {
                                                children: "Blue team"
                                              }),
                                          JsxRuntime.jsx("th", {
                                                children: "Red team"
                                              }),
                                          JsxRuntime.jsx("th", {
                                                children: "When"
                                              }),
                                          JsxRuntime.jsx("th", {
                                                children: "Score"
                                              }),
                                          JsxRuntime.jsx("th", {
                                                children: "Actions"
                                              })
                                        ]
                                      })
                                }),
                            JsxRuntime.jsx("tbody", {
                                  children: Js_dict.entries(games).toReversed().map(function (param) {
                                        var game = param[1];
                                        var key = param[0];
                                        var bluePlayers = game.blueTeam.map(function (player) {
                                              var player$1 = players.find(function (p) {
                                                    return p.key === player;
                                                  });
                                              if (player$1 !== undefined) {
                                                return player$1.name;
                                              } else {
                                                return "...";
                                              }
                                            });
                                        var redPlayers = game.redTeam.map(function (player) {
                                              var player$1 = players.find(function (p) {
                                                    return p.key === player;
                                                  });
                                              if (player$1 !== undefined) {
                                                return player$1.name;
                                              } else {
                                                return "...";
                                              }
                                            });
                                        return JsxRuntime.jsxs("tr", {
                                                    children: [
                                                      JsxRuntime.jsx("td", {
                                                            children: bluePlayers.join(", "),
                                                            className: "px-2 py-1"
                                                          }),
                                                      JsxRuntime.jsx("td", {
                                                            children: redPlayers.join(", "),
                                                            className: "px-2 py-1"
                                                          }),
                                                      JsxRuntime.jsx("td", {
                                                            children: game.date.toISOString(),
                                                            className: "px-2 py-1"
                                                          }),
                                                      JsxRuntime.jsx("td", {
                                                            children: "Blue " + game.blueScore.toString() + ":" + game.redScore.toString() + " Red",
                                                            className: "px-2 py-1"
                                                          }),
                                                      JsxRuntime.jsx("td", {
                                                            children: JsxRuntime.jsx("button", {
                                                                  children: "Remove",
                                                                  className: "bg-slate-300 rounded py-1 px-3 text-black",
                                                                  onClick: (function (param) {
                                                                      if (confirm("Are you sure you want to remove this (" + key + ") game?")) {
                                                                        console.log("Ok");
                                                                        Games.removeGame(key);
                                                                        return ;
                                                                      }
                                                                      
                                                                    })
                                                                }),
                                                            className: "px-2 py-1 flex gap-2"
                                                          })
                                                    ]
                                                  }, game.date.toString());
                                      })
                                })
                          ]
                        })
                  ]
                })
          ]
        });
  }
  return JsxRuntime.jsxs("div", {
              children: [
                JsxRuntime.jsxs("h1", {
                      children: [
                        JsxRuntime.jsx(Link, {
                              href: "/",
                              children: "← Back - ",
                              className: "font-thin"
                            }),
                        "Admin dashboard"
                      ],
                      className: "text-3xl pb-2 font-bold"
                    }),
                content
              ],
              className: "bg-blobs bg-darkbg bg-no-repeat bg-left text-white flex flex-col min-h-screen w-full p-10"
            });
}

var make = Admin;

export {
  make ,
}
/* Games Not a pure module */
