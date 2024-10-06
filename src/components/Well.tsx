import { CSSProperties, memo, useEffect, useState } from "react"

import { PlayerRenderState } from "../types"
import Block from "./Block"

interface IWellProps {
  factor?: number
  renderState: PlayerRenderState
}

function Well(props: IWellProps) {
  const { factor = 1, renderState } = props
  const { block, gameOver, well } = renderState
  const [index, setIndex] = useState(22)

  useEffect(() => {
    if (gameOver) {
      const interval = setInterval(
        () =>
          setIndex((index) => {
            if (index === 0) {
              clearInterval(interval)
            }
            return index - 1
          }),
        50
      )
      return () => clearInterval(interval)
    }
  }, [gameOver])

  return (
    <div
      className="well"
      style={
        {
          "--factor": factor,
        } as CSSProperties
      }
    >
      {well.map((line, i) =>
        line.map((cell, j) =>
          cell ? (
            <div
              key={`${i}-${j}`}
              className={`block__cell ${i >= index ? "block__cell--gameOver" : ""}`}
              style={
                {
                  "--color": cell,
                  top: `calc(var(--block) * ${i - 2} * var(--factor))`,
                  left: `calc(var(--block) * ${j} * var(--factor))`,
                } as CSSProperties
              }
            />
          ) : null
        )
      )}
      <Block key={block.id} block={block} gameOver={index <= 0} position />
    </div>
  )
}

export default memo(Well)
