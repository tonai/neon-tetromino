import { memo, useState } from "react"
import { minPlayers } from "../constants"
import { Mode, Persisted } from "../types"

import Avatar from "./Avatar"
import Title from "./Title"
import Tooltip from "./Tooltip"

export interface IStartScreenProps {
  persisted: Persisted
  players: string[]
  t: (word: string) => string
  votes: Record<string, Mode | undefined>
}

function StartScreen(props: IStartScreenProps) {
  const { persisted, players, t, votes } = props
  const [easterEggCounter, setEasterEggCounter] = useState(0)
  const playersByMode = Object.entries(votes).reduce<Record<Mode, string[]>>(
    (acc, [id, vote]) => {
      if (vote) {
        acc[vote].push(id)
      }
      return acc
    },
    { [Mode.BR]: [], [Mode.ENDLESS]: [] }
  )

  function handleSelect(mode: Mode) {
    return () => {
      Rune.actions.ready(mode)
      if (mode === Mode.ENDLESS) {
        setEasterEggCounter((x) => x + 1)
      } else {
        setEasterEggCounter(0)
      }
    }
  }

  return (
    <div className="start-screen">
      <Title
        subtitle="neon"
        title={easterEggCounter < 5 ? "TETROMINO" : "TETROMINOU"}
      />
      {Object.values(Mode).map((mode) => (
        <div key={mode} className="start-screen__mode">
          <button
            className="button text"
            disabled={players.length < minPlayers[mode]}
            type="button"
            onClick={handleSelect(mode)}
          >
            {t(mode)}
          </button>
          {persisted.highScores?.[mode] !== undefined &&
            persisted.highScores?.[mode] > 0 && (
              <div className="start-screen__score text">
                {t("Best:")} {persisted.highScores[mode]}
              </div>
            )}
          <Tooltip>
            <p>{t(`[${mode}]`)}</p>
          </Tooltip>
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

export default memo(StartScreen)
