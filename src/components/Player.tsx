import { memo, MutableRefObject, useEffect, useRef } from "react"
import { PlayerUiState } from "../types"

import Avatar from "./Avatar"

interface IPlayerProps {
  id: string
  playerRefs?: MutableRefObject<Record<string, HTMLDivElement>>
  uiState: PlayerUiState
}

function Player(props: IPlayerProps) {
  const { id, playerRefs, uiState } = props
  const { clearedLines, score } = uiState
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (playerRefs && ref.current) {
      playerRefs.current[id] = ref.current
    }
  }, [id, playerRefs])

  return (
    <div className="player" ref={ref}>
      <Avatar clearedLines={clearedLines} id={id} />
      <div className="player__score text">{score}</div>
    </div>
  )
}

export default memo(Player)
