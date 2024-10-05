import { playSound } from "@tonai/game-utils"
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from "react"

interface ITooltipProps {
  children: ReactNode
}

export default function Tooltip(props: ITooltipProps) {
  const { children } = props
  const [opened, setOpened] = useState(false)
  const classNames = ["tooltip__content", "box"]
  if (opened) {
    classNames.push("tooltip__content--open")
  }
  const close = useCallback(() => {
    if (opened) {
      setOpened(false)
    }
  }, [opened])
  const open = useCallback(() => {
    if (!opened) {
      playSound("button")
      setOpened(true)
    }
  }, [opened])

  useEffect(() => {
    if (opened) {
      setTimeout(() => window.addEventListener("click", close), 0)
      return () => window.removeEventListener("click", close)
    }
  }, [close, opened])

  function stop(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <div className="tooltip">
      <button className="tooltip__button text" onClick={open}>
        ?
      </button>
      <div className={classNames.join(" ")} onClick={stop}>
        {children}
      </div>
    </div>
  )
}
