import { GameState } from "../types"

import Player from "./Player"

interface IPlayersProps {
  game: GameState
}

export default function Players(props: IPlayersProps) {
  const { game } = props
  const { playerIds, playersState, spectators } = game
  return (
    <div className="players">
      {playerIds
        .filter((id) => !spectators.includes(id))
        .map((id) => (
          <Player key={id} id={id} playerState={playersState[id]} />
        ))}
    </div>
  )
}
