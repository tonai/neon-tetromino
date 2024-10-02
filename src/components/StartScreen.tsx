import { minPlayers } from "../constants"
import { Mode } from "../types"

import Avatar from "./Avatar"
import Title from "./Title"

export interface IStartScreenProps {
  players: string[]
  votes: Record<string, Mode | undefined>
}

export default function StartScreen(props: IStartScreenProps) {
  const { players, votes } = props
  const playersByMode = Object.entries(votes).reduce<Record<Mode, string[]>>(
    (acc, [id, vote]) => {
      if (vote) {
        acc[vote].push(id)
      }
      return acc
    },
    { [Mode.BR]: [], [Mode.ENDLESS]: [] }
  )
  return (
    <div className="start-screen">
      <Title />
      {Object.values(Mode).map((mode) => (
        <div key={mode} className="start-screen__mode">
          <button
            className="button text"
            disabled={players.length < minPlayers[mode]}
            type="button"
            onClick={() => Rune.actions.ready(mode)}
          >
            {mode}
          </button>
          <div className="start-screen__players">
            {playersByMode[mode].map((id) => (
              <Avatar key={id} className="start-screen__player" id={id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
