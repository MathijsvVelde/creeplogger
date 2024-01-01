// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Button from "../components/Button.bs.mjs";
import * as ListIcon from "../components/ListIcon.bs.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as FirebaseStatus from "../helpers/FirebaseStatus.bs.mjs";
import * as JsxRuntime from "react/jsx-runtime";
import * as HeaderModuleCss from "./header.module.css";

var styles = HeaderModuleCss;

function Header(props) {
  var __disabled = props.disabled;
  var onReset = props.onReset;
  var onNextStep = props.onNextStep;
  var disabled = __disabled !== undefined ? __disabled : false;
  var match = React.useState(function () {
        return false;
      });
  var setShowScores = match[1];
  var isConnected = FirebaseStatus.useFirebaseStatus();
  var nextLabel;
  switch (props.step) {
    case "ScoreForm" :
        nextLabel = "Opslaan";
        break;
    case "UserSelection" :
    case "Confirmation" :
        nextLabel = "Verder";
        break;
    
  }
  return JsxRuntime.jsx(JsxRuntime.Fragment, {
              children: Caml_option.some(JsxRuntime.jsx("div", {
                        children: JsxRuntime.jsxs("div", {
                              children: [
                                JsxRuntime.jsx("div", {
                                      children: JsxRuntime.jsx("button", {
                                            children: JsxRuntime.jsx(ListIcon.make, {}),
                                            className: styles.iconButton,
                                            onClick: (function (param) {
                                                setShowScores(function (param) {
                                                      return true;
                                                    });
                                              })
                                          }),
                                      className: styles.buttonWrapper
                                    }),
                                JsxRuntime.jsxs("div", {
                                      children: [
                                        JsxRuntime.jsx("span", {
                                              className: isConnected ? styles.connected : styles.disconnected
                                            }),
                                        JsxRuntime.jsx(Button.make, {
                                              variant: "Grey",
                                              onClick: (function (param) {
                                                  onReset();
                                                }),
                                              children: "Reset"
                                            }),
                                        JsxRuntime.jsx(Button.make, {
                                              variant: "Blue",
                                              onClick: (function (param) {
                                                  onNextStep();
                                                }),
                                              children: nextLabel,
                                              disabled: !isConnected || disabled
                                            })
                                      ],
                                      className: styles.buttonWrapper
                                    })
                              ],
                              className: styles.headerGrid
                            }),
                        className: styles.header
                      }))
            });
}

var make = Header;

export {
  styles ,
  make ,
}
/* styles Not a pure module */
