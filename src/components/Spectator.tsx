import { GameState } from "../types"

import Player from "./Player"
import Well from "./Well"

interface ISpectatorProps {
  game: GameState
  t: (word: string) => string
}

export default function Spectator(props: ISpectatorProps) {
  const { game, t } = props
  const { playerIds, playersState, spectators } = game
  const players = playerIds.filter((id) => !spectators.includes(id))
  const classNames = [
    "spectator__screens",
    `spectator__screens--${players.length}`,
  ]
  return (
    <div className="spectator">
      <div className="spectator__title text">{t("You are spectating")}</div>
      <div className={classNames.join(" ")}>
        {Object.entries(playersState).map(([id, playerState]) => (
          <div key={id} className="spectator__screen">
            <div className="spectator__avatar">
              <Player id={id} playerState={playerState} />
            </div>
            <div className="spectator__well">
              <Well
                factor={
                  players.length < 3 ? 0.6 : players.length < 5 ? 0.5 : 0.4
                }
                playerState={playerState}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
