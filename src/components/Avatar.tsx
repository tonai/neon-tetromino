import { Player, PlayerId } from "rune-sdk"

interface IAvatarProps {
  id?: PlayerId
  name?: boolean
  player?: Player
}

export default function Avatar(props: IAvatarProps) {
  const { id, name } = props
  const player = props.player ?? Rune.getPlayerInfo(id ?? "")
  return (
    <div className="avatar">
      {name && <div className="avatar__name">{player.displayName}</div>}
      <div className="avatar__wrapper">
        <img className="avatar__image" src={player.avatarUrl} />
      </div>
    </div>
  )
}
