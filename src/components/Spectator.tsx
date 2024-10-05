import { memo } from "react"
import { PlayerRenderState, PlayerUiState } from "../types"

import Player from "./Player"
import Well from "./Well"

interface ISpectatorProps {
  playerIds: string[]
  playersRenderState: Record<string, PlayerRenderState>
  playersUiState: Record<string, PlayerUiState>
  spectators: string[]
  t: (word: string) => string
}

function Spectator(props: ISpectatorProps) {
  const { playerIds, playersRenderState, playersUiState, spectators, t } = props
  const players = playerIds.filter((id) => !spectators.includes(id))
  const classNames = [
    "spectator__screens",
    `spectator__screens--${players.length}`,
  ]
  return (
    <div className="spectator">
      <div className="spectator__title text">{t("You are spectating")}</div>
      <div className={classNames.join(" ")}>
        {Object.entries(playersRenderState).map(([id, renderState]) => (
          <div key={id} className="spectator__screen">
            <div className="spectator__avatar">
              <Player id={id} uiState={playersUiState[id]} />
            </div>
            <div className="spectator__well">
              <Well
                factor={
                  players.length < 3 ? 0.6 : players.length < 5 ? 0.5 : 0.4
                }
                renderState={renderState}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Spectator)
