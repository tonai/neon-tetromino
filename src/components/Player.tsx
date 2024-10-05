import { memo } from "react"
import { PlayerUiState } from "../types"

import Avatar from "./Avatar"

interface IPlayerProps {
  id: string
  uiState: PlayerUiState
}

function Player(props: IPlayerProps) {
  const { id, uiState } = props
  const { clearedLines, score } = uiState
  return (
    <div className="player">
      <Avatar clearedLines={clearedLines} id={id} />
      <div className="player__score text">{score}</div>
    </div>
  )
}

export default memo(Player)
