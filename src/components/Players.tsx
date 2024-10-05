import { memo } from "react"
import { PlayerUiState } from "../types"

import Player from "./Player"

interface IPlayersProps {
  playerIds: string[]
  playersUiState: Record<string, PlayerUiState>
  spectators: string[]
}

function Players(props: IPlayersProps) {
  const { playerIds, playersUiState, spectators } = props
  return (
    <div className="players">
      {playerIds
        .filter((id) => !spectators.includes(id))
        .map((id) => (
          <Player key={id} id={id} uiState={playersUiState[id]} />
        ))}
    </div>
  )
}

export default memo(Players)
