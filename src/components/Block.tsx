import { CSSProperties } from "react"
import { BlockType, Block as IBlock } from "../types"

interface IBlockProps {
  block: IBlock
  position?: boolean
}

function getBlock(tetromino: number[][]) {
  return tetromino.map((line, i) =>
    line.map((cell, j) =>
      cell ? (
        <div
          key={`${i}-${j}`}
          className="block__cell"
          style={{
            translate: `calc(var(--block) * ${j}) calc(var(--block) * ${i})`,
          }}
        />
      ) : null
    )
  )
}

export default function Block(props: IBlockProps) {
  const { block, position } = props
  const { column, matrix, row, type } = block
  const key = Object.keys(BlockType)[Object.values(BlockType).indexOf(type)]
  const classNames = ["block", `block--${key}`]
  const style = {
    "--color": type,
    width: `calc(var(--block) * ${matrix[0].length})`,
    height: `calc(var(--block) * ${matrix.filter((line) => line.some((cell) => cell)).length})`,
  } as CSSProperties

  if (position) {
    classNames.push("block--falling")
    style.translate = `calc(var(--block) * ${column}) calc(var(--block) * ${row - 2})`
  }
  return (
    <div className={classNames.join(" ")} style={style}>
      {getBlock(matrix)}
    </div>
  )
}
