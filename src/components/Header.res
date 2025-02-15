@module external styles: {..} = "./header.module.css"

@react.component
let make = (
  ~step: LoggerStep.step,
  ~onNextStep,
  ~onReset,
  ~disabled=false,
  ~setShowQueueButtons,
  ~gameMode,
  ~setGameMode,
) => {
  let user = Database.useUser()
  let (showScores, setShowScores) = React.useState(_ => false)
  let (showStats, setShowStats) = React.useState(_ => false)

  let isConnected = FirebaseStatus.useFirebaseStatus()

  let nextLabel = switch step {
  | LoggerStep.UserSelection | LoggerStep.Confirmation => "Verder"
  | LoggerStep.ScoreForm => "Opslaan"
  }

  <>
    <LeaderboardModal
      show={showScores} setShow={setShowScores} gameMode={gameMode} setGameMode={setGameMode}
    />
    <StatsModal show={showStats} setShow={setShowStats} />
    <div
      className="px-10 py-5 sticky top-0 bg-overlay z-40 backdrop-blur-overlay backdrop-saturate-overlay">
      <div className="flex justify-between flex-wrap text-white gap-5">
        <div className="flex items-center gap-5">
          <button
            className="text-white w-[44px] aspect-square text-[26px] flex justify-center items-center -ml-3 rounded-full bg-black/0 transition-all ease-in-out duration-200 shadow-none hover:bg-black/20 hover:shadow-icon-button hover:ring-8 ring-black/20 active:bg-black/20 active:shadow-icon-button active:ring-8 plausible-event-name=ShowScores"
            onClick={_ => setShowScores(_ => true)}>
            <ListIcon />
          </button>
          <button
            className="text-white w-[44px] aspect-square text-[26px] flex justify-center items-center -ml-3 rounded-full bg-black/0 transition-all ease-in-out duration-200 shadow-none hover:bg-black/20 hover:shadow-icon-button hover:ring-8 ring-black/20 active:bg-black/20 active:shadow-icon-button active:ring-8 plausible-event-name=ShowStats"
            onClick={_ => setShowStats(_ => true)}>
            <PieChartIcon />
          </button>
          {switch setGameMode {
          | Some(setGameMode) =>
            switch gameMode {
            | Games.Foosball =>
              <button
                className="text-white w-[44px] aspect-square text-[26px] flex justify-center items-center -ml-3 rounded-full bg-black/0 transition-all ease-in-out duration-200 shadow-none hover:bg-black/20 hover:shadow-icon-button hover:ring-8 ring-black/20 active:bg-black/20 active:shadow-icon-button active:ring-8  plausible-event-name=GameModeDarts"
                onClick={_ => setGameMode(_ => Games.Darts)}>
                <SoccerIcon />
              </button>
            | Games.Darts =>
              <button
                className="text-white w-[44px] aspect-square text-[26px] flex justify-center items-center -ml-3 rounded-full bg-black/0 transition-all ease-in-out duration-200 shadow-none hover:bg-black/20 hover:shadow-icon-button hover:ring-8 ring-black/20 active:bg-black/20 active:shadow-icon-button active:ring-8 "
                onClick={_ => setGameMode(_ => Games.Foosball)}>
                <DartsIcon />
              </button>
            }
          | None => <> </>
          }}
          <button
            className="text-white w-[44px] aspect-square text-[26px] hidden justify-center items-center -ml-3 rounded-full bg-black/0 transition-all ease-in-out duration-200 shadow-none hover:bg-black/20 hover:shadow-icon-button hover:ring-8 ring-black/20 active:bg-black/20 active:shadow-icon-button active:ring-8"
            onClick={_ => setShowQueueButtons(show => !show)}>
            <TicketIcon />
          </button>
          {switch user {
          | Value(_) =>
            <Link
              href="/admin"
              className="text-white w-[44px] aspect-square text-[26px] flex justify-center items-center -ml-3 rounded-full bg-black/0 transition-all ease-in-out duration-200 shadow-none hover:bg-black/20 hover:shadow-icon-button hover:ring-8 ring-black/20 active:bg-black/20 active:shadow-icon-button active:ring-8 ">
              <AdminIcon />
            </Link>
          | _ => <> </>
          }}
        </div>
        <div className="flex items-center gap-5">
          <span className={isConnected ? styles["connected"] : styles["disconnected"]} />
          <Button variant={Grey} onClick={_ => onReset()}> {React.string("Reset")} </Button>
          <Button
            variant={Blue}
            onClick={_ => onNextStep()}
            disabled={!isConnected || disabled}
            className="plausible-event-name=NextStep">
            {React.string(nextLabel)}
          </Button>
        </div>
      </div>
    </div>
  </>
}
