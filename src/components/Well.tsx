import { CSSProperties } from "react"
import { PlayerState } from "../types"
import Block from "./Block"

interface IWellProps {
  factor?: number
  playerState: PlayerState
}

export default function Well(props: IWellProps) {
  const { factor = 1, playerState } = props
  const { block, well } = playerState
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
              className="block__cell"
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
      <Block key={block.id} block={block} position />
    </div>
  )
}
