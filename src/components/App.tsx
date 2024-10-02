import { useEffect, useState } from "react"
import { PlayerId } from "rune-sdk"

import { GameState, Step } from "../types/logic.ts"

import Background from "./Background.tsx"
import Game from "./Game.tsx"
import Players from "./Players.tsx"
import StartScreen from "./StartScreen.tsx"
import Sun from "./Sun.tsx"

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
      <Sun />
      {game.step === Step.WAIT && (
        <>
          <Background />
          <StartScreen players={game.playerIds} votes={game.votes} />
        </>
      )}
      {game.step === Step.PLAY && (
        <>
          <Players game={game} />
          <Game game={game} playerId={yourPlayerId} />
        </>
      )}
      <div className="background__grid"></div>
    </>
  )
}
