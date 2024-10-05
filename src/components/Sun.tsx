import { memo } from "react"

function Sun() {
  return (
    <div className="sun">
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
