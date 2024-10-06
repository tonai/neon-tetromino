import { useEffect, useRef } from "react"
import { PlayerId } from "rune-sdk"
import { playSound } from "@tonai/game-utils"

import { GameState } from "../types/logic.ts"

import NextBlock from "./NextBlock.tsx"
import Well from "./Well.tsx"
import Controls from "./Controls.tsx"
import Garbage from "./Garbage.tsx"

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
  const { playersGarbage, playersRenderState, playersUiState } = game
  const renderState = playersRenderState[playerId]
  const uiState = playersUiState[playerId]
  const playerGarbage = playersGarbage.find(({ id }) => id === playerId)

  const clearedLines = useRef(uiState.clearedLines)
  useEffect(() => {
    if (
      areArrayDifferent(uiState.clearedLines, clearedLines.current) &&
      uiState.clearedLines.length > 0
    ) {
      playSound("clear")
      clearedLines.current = uiState.clearedLines
    }
  }, [uiState.clearedLines])

  useEffect(() => {
    if (renderState.gameOver) {
      playSound("lost")
    }
  }, [renderState.gameOver])

  return (
    <div className="game">
      <Well renderState={renderState} />
      <div className="game__column">
        <NextBlock block={renderState.sequence[0]} />
        <div className="game__garbages">
          {playerGarbage?.garbages.map((garbage) => (
            <Garbage key={garbage.id} garbage={garbage} />
          ))}
        </div>
      </div>
      {!renderState.gameOver && (
        <Controls renderState={renderState} showControls={showControls} />
      )}
    </div>
  )
}
