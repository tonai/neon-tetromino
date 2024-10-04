import { MouseEvent, useCallback, useEffect, useState } from "react"
import { GameStateWithPersisted, PlayerId } from "rune-sdk"
import { createTranslator } from "@tonai/game-utils"

import { Locale, locales, translations } from "../constants/i18n"
import { GameState, Persisted, Step } from "../types"

import Background from "./Background.tsx"
import Help from "./Help.tsx"
import Game from "./Game.tsx"
import Players from "./Players.tsx"
import Settings from "./Settings.tsx"
import Spectator from "./Spectator.tsx"
import StartScreen from "./StartScreen.tsx"
import Sun from "./Sun.tsx"

export const translator = createTranslator(translations)

export default function App() {
  const [game, setGame] =
    useState<GameStateWithPersisted<GameState, Persisted>>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()
  const [helpOpen, setHelpOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>(() => {
    const language = navigator.language.split("-")[0]
    return language in locales ? language : "en"
  })
  const [showControls, setShowControls] = useState(false)

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

  useEffect(() => {
    if (yourPlayerId && game?.persisted[yourPlayerId]?.locale) {
      setLocale(game?.persisted[yourPlayerId]?.locale)
    }
    if (yourPlayerId && game?.persisted[yourPlayerId]?.showControls) {
      setShowControls(game?.persisted[yourPlayerId]?.showControls)
    }
  }, [game?.persisted, yourPlayerId])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  return (
    <>
      <Sun />
      {yourPlayerId && !game.spectators.includes(yourPlayerId) && (
        <>
          {game.step === Step.WAIT && (
            <>
              <Background />
              <StartScreen
                persisted={game?.persisted[yourPlayerId]}
                players={game.playerIds}
                t={t}
                votes={game.votes}
              />
            </>
          )}
          {game.step === Step.PLAY && (
            <>
              <Players game={game} />
              <Game
                game={game}
                playerId={yourPlayerId}
                showControls={showControls}
              />
            </>
          )}
          <Settings
            close={closeSettings}
            locale={locale}
            open={openSettings}
            opened={settingsOpen}
            setLocale={setLocale}
            setShowControls={setShowControls}
            showControls={showControls}
            t={t}
          />
          <Help
            close={() => setHelpOpen(false)}
            open={() => setHelpOpen(true)}
            opened={helpOpen}
            t={t}
          />
        </>
      )}
      {(!yourPlayerId || game.spectators.includes(yourPlayerId)) && (
        <Spectator game={game} t={t} />
      )}
      <div className="background__grid"></div>
    </>
  )
}
