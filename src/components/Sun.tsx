import { memo } from "react"

import { Step } from "../types"

interface ISunProps {
  step: Step
}

function Sun(props: ISunProps) {
  const { step } = props

  return (
    <div className={`sun sun--${step}`}>
      <div className="sun__face sun__front"></div>
      <div className="sun__line"></div>
      <div className="sun__line"></div>
      <div className="sun__line"></div>
      <div className="sun__line"></div>
      <div className="sun__line"></div>
    </div>
  )
}

export default memo(Sun)
