import { memo, useEffect, useRef } from "react"
import { playSound } from "@tonai/game-utils"

import { PlayerState } from "../types"

interface IControlsProps {
  playerState: PlayerState
  showControls: boolean
}

function areMatrixDifferent(m1: number[][], m2: number[][]) {
  return m1.some((line, i) => line.some((cell, j) => cell !== m2[i][j]))
}

function Controls(props: IControlsProps) {
  const { playerState, showControls } = props
  const classNames = ["controls"]
  if (showControls) {
    classNames.push("controls--show")
  }

  const down = useRef<string>()
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!down.current) {
        down.current = event.key
        switch (event.key) {
          case "ArrowLeft":
            return Rune.actions.leftDown()
          case "ArrowRight":
            return Rune.actions.rightDown()
          case "ArrowUp":
            return Rune.actions.centerDown()
          case "ArrowDown":
            return Rune.actions.bottomDown()
        }
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      if (down.current === event.key) {
        down.current = undefined
        switch (event.key) {
          case "ArrowLeft":
            return Rune.actions.leftUp()
          case "ArrowRight":
            return Rune.actions.rightUp()
          case "ArrowUp":
            return Rune.actions.centerUp()
          case "ArrowDown":
            return Rune.actions.bottomUp()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const matrix = useRef(playerState.block.matrix)
  const id = useRef(playerState.block.id)
  useEffect(() => {
    if (
      areMatrixDifferent(playerState.block.matrix, matrix.current) &&
      playerState.block.id === id.current
    ) {
      playSound("rotate")
      matrix.current = playerState.block.matrix
    }
  }, [playerState.block.matrix, playerState.block.id])
  useEffect(() => {
    if (playerState.block.id !== id.current) {
      id.current = playerState.block.id
    }
  }, [playerState.block.matrix, playerState.block.id])

  return (
    <div className={classNames.join(" ")}>
      <button
        className="controls__btn controls__bottom"
        type="button"
        // onMouseDown={() => Rune.actions.bottomDown()}
        // onMouseUp={() => Rune.actions.bottomUp()}
        onTouchStart={() => Rune.actions.bottomDown()}
        onTouchEnd={() => Rune.actions.bottomUp()}
      ></button>
      <button
        className="controls__btn controls__center"
        type="button"
        // onMouseDown={() => Rune.actions.centerDown()}
        // onMouseUp={() => Rune.actions.centerUp()}
        onTouchStart={() => Rune.actions.centerDown()}
        onTouchEnd={() => Rune.actions.centerUp()}
      ></button>
      <button
        className="controls__btn controls__left"
        type="button"
        // onMouseDown={() => Rune.actions.leftDown()}
        // onMouseUp={() => Rune.actions.leftUp()}
        onTouchStart={() => Rune.actions.leftDown()}
        onTouchEnd={() => Rune.actions.leftUp()}
      ></button>
      <button
        className="controls__btn controls__right"
        type="button"
        // onMouseDown={() => Rune.actions.rightDown()}
        // onMouseUp={() => Rune.actions.rightUp()}
        onTouchStart={() => Rune.actions.rightDown()}
        onTouchEnd={() => Rune.actions.rightUp()}
      ></button>
    </div>
  )
}

export default memo(Controls)
