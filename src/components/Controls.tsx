interface IControlsProps {
  showControls: boolean
}

export default function Controls(props: IControlsProps) {
  const { showControls } = props
  const classNames = ["controls"]
  if (showControls) {
    classNames.push("controls--show")
  }

  return (
    <div className={classNames.join(" ")}>
      <button
        className="controls__btn controls__bottom"
        type="button"
        onMouseDown={() => Rune.actions.bottomDown()}
        onMouseUp={() => Rune.actions.bottomUp()}
        onTouchStart={() => Rune.actions.bottomDown()}
        onTouchEnd={() => Rune.actions.bottomUp()}
      ></button>
      <button
        className="controls__btn controls__center"
        type="button"
        onMouseDown={() => Rune.actions.centerDown()}
        onMouseUp={() => Rune.actions.centerUp()}
        onTouchStart={() => Rune.actions.centerDown()}
        onTouchEnd={() => Rune.actions.centerUp()}
      ></button>
      <button
        className="controls__btn controls__left"
        type="button"
        onMouseDown={() => Rune.actions.leftDown()}
        onMouseUp={() => Rune.actions.leftUp()}
        onTouchStart={() => Rune.actions.leftDown()}
        onTouchEnd={() => Rune.actions.leftUp()}
      ></button>
      <button
        className="controls__btn controls__right"
        type="button"
        onMouseDown={() => Rune.actions.rightDown()}
        onMouseUp={() => Rune.actions.rightUp()}
        onTouchStart={() => Rune.actions.rightDown()}
        onTouchEnd={() => Rune.actions.rightUp()}
      ></button>
    </div>
  )
}
