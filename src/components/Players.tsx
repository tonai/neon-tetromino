import { PlayerId } from "rune-sdk"
import Avatar from "./Avatar"

interface IPlayersProps {
  playerIds: PlayerId[]
}

export default function Players(props: IPlayersProps) {
  const { playerIds } = props
  return (
    <div className="players">
      {playerIds.map((id) => (
        <Avatar key={id} id={id} />
      ))}
    </div>
  )
}
