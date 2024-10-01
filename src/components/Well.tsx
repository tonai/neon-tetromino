import { CSSProperties } from "react"
import { PlayerState } from "../types"
import Block from "./Block"

interface IWellProps {
  playerState: PlayerState
}

export default function Well(props: IWellProps) {
  const { playerState } = props
  const { block, well } = playerState
  return (
    <div className="well">
      {well.map((line, i) =>
        line.map((cell, j) =>
          cell ? (
            <div
              key={`${i}-${j}`}
              className="block__cell"
              style={
                {
                  "--color": cell,
                  top: `calc(var(--block) * ${i - 2})`,
                  left: `calc(var(--block) * ${j})`,
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
