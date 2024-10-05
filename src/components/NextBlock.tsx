import { memo } from "react"

import { Block as IBlock } from "../types"

import Block from "./Block"

interface INextBlockProps {
  block: IBlock
}

function NextBlock(props: INextBlockProps) {
  const { block } = props
  return (
    <div className="next-block">
      <Block block={block} />
    </div>
  )
}

export default memo(NextBlock)
