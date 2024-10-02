import { PlayerState } from "../types"

import Avatar from "./Avatar"

interface IPlayerProps {
  id: string
  playerState: PlayerState
}

export default function Player(props: IPlayerProps) {
  const { id, playerState } = props
  const { clearedLines, score } = playerState
  return (
    <div className="player">
      <Avatar clearedLines={clearedLines} id={id} />
      <div className="player__score text">{score}</div>
    </div>
  )
}
