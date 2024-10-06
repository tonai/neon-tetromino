import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { GameStateWithPersisted, PlayerId } from "rune-sdk"
import {
  createTranslator,
  initSounds,
  playSequence,
  playSound,
} from "@tonai/game-utils"

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
initSounds({
  button: "sound/button.mp3",
  clear: "sound/clear.mp3",
  close: "sound/close.mp3",
  intro: "sound/intro.mp3",
  lost: "sound/lost.mp3",
  mainLoop: "sound/mainLoop.mp3",
  open: "sound/open.mp3",
  rotate: "sound/rotate.mp3",
  select: "sound/select.mp3",
})

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
  const playerRefs = useRef<Record<string, HTMLDivElement>>({})

  const closeSettings = useCallback(() => {
    playSound("close")
    setSettingsOpen(false)
  }, [])
  const openSettings = useCallback((event: MouseEvent) => {
    playSound("open")
    event.stopPropagation()
    setSettingsOpen(true)
  }, [])
  const closeHelp = useCallback(() => {
    playSound("close")
    setHelpOpen(false)
  }, [])
  const openHelp = useCallback(() => {
    playSound("open")
    setHelpOpen(true)
  }, [])
  const t = useCallback(
    (word: string) => {
      return translator(locale)(word)
    },
    [locale]
  )

  useEffect(() => {
    Rune.initClient({
      onChange: ({ action, game, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)
        if (action?.name === "ready" && game.votes[action.playerId]) {
          playSound("select")
        }
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

  useEffect(() => {
    playSequence(["intro", "mainLoop"], 0.2)
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  return (
    <>
      <Sun step={game.step} />
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
              <Players
                playerIds={game.playerIds}
                playerRefs={playerRefs}
                playersUiState={game.playersUiState}
                spectators={game.spectators}
              />
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
          <Help close={closeHelp} open={openHelp} opened={helpOpen} t={t} />
        </>
      )}
      {(!yourPlayerId || game.spectators.includes(yourPlayerId)) && (
        <Spectator
          playerIds={game.playerIds}
          playersRenderState={game.playersRenderState}
          playersUiState={game.playersUiState}
          spectators={game.spectators}
          t={t}
        />
      )}
      <div className="background__grid"></div>
    </>
  )
}
