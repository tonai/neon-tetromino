import { useEffect, useRef } from "react"
import { PlayerId } from "rune-sdk"
import { createArray, playSound } from "@tonai/game-utils"

import { GameState } from "../types/logic.ts"

import NextBlock from "./NextBlock.tsx"
import Well from "./Well.tsx"
import Controls from "./Controls.tsx"

export interface IGameProps {
  game: GameState
  playerId: PlayerId
  showControls: boolean
}

function areArrayDifferent(a1: number[], a2: number[]) {
  return a1.some((item, i) => item !== a2[i])
}

export default function Game(props: IGameProps) {
  const { game, playerId, showControls } = props
  const { playersState, playersGarbage } = game
  const playerState = playersState[playerId]
  const playerGarbage = playersGarbage.find(({ id }) => id === playerId)
  const totalGarbage = createArray(
    playerGarbage?.rows.reduce((a, b) => a + b, 0) ?? 0
  )

  const clearedLines = useRef(playerState.clearedLines)
  useEffect(() => {
    if (
      areArrayDifferent(playerState.clearedLines, clearedLines.current) &&
      playerState.clearedLines.length > 0
    ) {
      playSound("clear")
      clearedLines.current = playerState.clearedLines
    }
  }, [playerState.clearedLines])

  useEffect(() => {
    if (playerState.gameOver) {
      playSound("lost")
    }
  }, [playerState.gameOver])

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
      {!game.playersState[playerId].gameOver && (
        <Controls playerState={playerState} showControls={showControls} />
      )}
    </div>
  )
}
