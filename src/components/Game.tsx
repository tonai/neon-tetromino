import { PlayerId } from "rune-sdk"
import { GameState } from "../types/logic.ts"

import NextBlock from "./NextBlock.tsx"
import Well from "./Well.tsx"

export interface IGameProps {
  game: GameState
  playerId: PlayerId
}

export default function Game(props: IGameProps) {
  const { game, playerId } = props
  const playerState = game.playersState[playerId]
  return (
    <div className="game">
      <Well playerState={playerState} />
      <div className="game__column">
        <NextBlock block={playerState.sequence[0]} />
      </div>
    </div>
  )
}
