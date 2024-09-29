import { Block as IBlock } from "../types"

import Block from "./Block"

interface INextBlockProps {
  block: IBlock
}

export default function NextBlock(props: INextBlockProps) {
  const { block } = props
  return (
    <div className="next-block">
      <Block block={block}/>
    </div>
  )
}