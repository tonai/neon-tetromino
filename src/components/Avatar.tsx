import { Player, PlayerId } from "rune-sdk"

interface IAvatarProps {
  className?: string
  clearedLines?: number[]
  id?: PlayerId
  name?: boolean
  player?: Player
}

export default function Avatar(props: IAvatarProps) {
  const { className, clearedLines, id, name } = props
  const player = props.player ?? Rune.getPlayerInfo(id ?? "")
  const classNames = ["avatar"]
  if (className) {
    classNames.push(className)
  }
  return (
    <div className={classNames.join(" ")}>
      {name && <div className="avatar__name">{player.displayName}</div>}
      <div className="avatar__wrapper">
        <img className="avatar__image" src={player.avatarUrl} />
        {clearedLines?.map((lines, i) => (
          <div key={i} className="avatar__lines reflect">
            <span className="reflect__back">x{lines}</span>
            <span className="reflect__front">x{lines}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
