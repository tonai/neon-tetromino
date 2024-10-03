import { MouseEvent, useCallback, useEffect, useState } from "react"
import { PlayerId } from "rune-sdk"
import { createTranslator } from "@tonai/game-utils"

import { Locale, translations } from "../constants/i18n"
import { GameState, Step } from "../types"

import Background from "./Background.tsx"
import Help from "./Help.tsx"
import Game from "./Game.tsx"
import Players from "./Players.tsx"
import Settings from "./Settings.tsx"
import StartScreen from "./StartScreen.tsx"
import Sun from "./Sun.tsx"

export const translator = createTranslator(translations)

export default function App() {
  const [game, setGame] = useState<GameState>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()
  const [helpOpen, setHelpOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>("en")

  const closeSettings = useCallback(() => {
    setSettingsOpen(false)
  }, [])
  const openSettings = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setSettingsOpen(true)
  }, [])
  const t = useCallback(
    (word: string) => {
      return translator(locale)(word)
    },
    [locale]
  )

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
          <StartScreen players={game.playerIds} t={t} votes={game.votes} />
        </>
      )}
      {game.step === Step.PLAY && (
        <>
          <Players game={game} />
          <Game game={game} playerId={yourPlayerId} />
        </>
      )}
      <div className="background__grid"></div>
      <Settings
        close={closeSettings}
        locale={locale}
        open={openSettings}
        opened={settingsOpen}
        setLocale={setLocale}
        t={t}
      />
      <Help
        close={() => setHelpOpen(false)}
        open={() => setHelpOpen(true)}
        opened={helpOpen}
        t={t}
      />
    </>
  )
}
