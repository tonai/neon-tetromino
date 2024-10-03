import { PlayerId } from "rune-sdk"
import { GameState } from "../types/logic.ts"

import NextBlock from "./NextBlock.tsx"
import Well from "./Well.tsx"
import Controls from "./Controls.tsx"
import { createArray } from "@tonai/game-utils"

export interface IGameProps {
  game: GameState
  playerId: PlayerId
}

export default function Game(props: IGameProps) {
  const { game, playerId } = props
  const { playersState, playersGarbage } = game
  const playerState = playersState[playerId]
  const playerGarbage = playersGarbage.find(({ id }) => id === playerId)
  const totalGarbage = createArray(
    playerGarbage?.rows.reduce((a, b) => a + b, 0) ?? 0
  )
  return (
    <div className="game">
      <Well playerState={playerState} />
      <div className="game__column">
        <NextBlock block={playerState.sequence[0]} />
        <div className="game__garbages">
          {totalGarbage.map((_, i) => (
            <div key={i} className="game__garbage"></div>
          ))}
        </div>
      </div>
      {!game.playersState[playerId].gameOver && <Controls />}
    </div>
  )
}
