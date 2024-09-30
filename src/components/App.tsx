import { useEffect, useState } from "react"
import { PlayerId } from "rune-sdk"

import { GameState, Step } from "../types/logic.ts"

import Game from "./Game.tsx"
import Players from "./Players.tsx"
import StartScreen from "./StartScreen.tsx"

export default function App() {
  const [game, setGame] = useState<GameState>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)
      },
    })
  }, [])

  if (!game || !yourPlayerId) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  return (
    <>
      {game.step === Step.WAIT && <StartScreen />}
      {game.step === Step.PLAY && (
        <>
          <Players game={game} />
          <Game game={game} playerId={yourPlayerId} />
        </>
      )}
    </>
  )
}
