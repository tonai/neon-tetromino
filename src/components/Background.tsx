import { CSSProperties, memo } from "react"

function Background() {
  return (
    <>
      <div className="background"></div>
      <div className="background__stars">
        <div
          className="background__star"
          style={{ "--x": "10vw", "--y": "10vh" } as CSSProperties}
        ></div>
        <div
          className="background__star"
          style={{ "--x": "5vw", "--y": "4vh" } as CSSProperties}
        ></div>
        <div
          className="background__star"
          style={{ "--x": "30vw", "--y": "8vh" } as CSSProperties}
        ></div>
        <div
          className="background__star"
          style={{ "--x": "75vw", "--y": "1vh" } as CSSProperties}
        ></div>
        <div
          className="background__star"
          style={{ "--x": "90vw", "--y": "12vh" } as CSSProperties}
        ></div>
      </div>
      <div className="background__mountain">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="background__gradient"></div>
      <div className="background__lines"></div>
    </>
  )
}

export default memo(Background)
