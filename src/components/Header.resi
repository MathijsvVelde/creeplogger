@react.component
let make: (
  ~step: LoggerStep.step,
  ~onNextStep: unit => unit,
  ~onReset: unit => unit,
  ~disabled: bool=?,
  ~setShowQueueButtons: (bool => bool) => unit,
  ~gameMode: Games.gameMode,
  ~setGameMode: option<(Games.gameMode => Games.gameMode) => unit>,
) => React.element
