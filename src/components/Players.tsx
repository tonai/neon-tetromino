import { memo, MutableRefObject } from "react"
import { PlayerUiState } from "../types"

import Player from "./Player"

interface IPlayersProps {
  playerIds: string[]
  playerRefs: MutableRefObject<Record<string, HTMLDivElement>>
  playersUiState: Record<string, PlayerUiState>
  spectators: string[]
}

function Players(props: IPlayersProps) {
  const { playerIds, playerRefs, playersUiState, spectators } = props

  return (
    <div className="players">
      {playerIds
        .filter((id) => !spectators.includes(id))
        .map((id) => (
          <Player
            key={id}
            id={id}
            playerRefs={playerRefs}
            uiState={playersUiState[id]}
          />
        ))}
    </div>
  )
}

export default memo(Players)
