import { memo } from "react"

import { Garbage as GarbageType } from "../types"
import { createArray } from "@tonai/game-utils"

interface IGarbageProps {
  garbage: GarbageType
}

function Garbage(props: IGarbageProps) {
  const { garbage } = props
  const totalGarbage = createArray(garbage.rows)


  return (
    <div className="garbage">
      {totalGarbage.map((_, i) => (
        <div key={i} className="garbage__item"></div>
      ))}
    </div>
  )
} // garbage--hidden

export default memo(Garbage)
