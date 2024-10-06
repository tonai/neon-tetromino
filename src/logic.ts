import { votesArray } from "@tonai/game-utils/server"
import { startRound } from "./logic/game"
import {
  addGarbage,
  getGarbage,
  getRandomSequence,
  getScore,
  getSpeed,
  isValidMove,
  moveLeft,
  moveRight,
  placeBlock,
  reset,
  rotate,
  saveHighScore,
} from "./logic/utils"
import { Mode, Step } from "./types"

const updatesPerSecond = 10

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  persistPlayerData: true,
  updatesPerSecond,
  setup: (allPlayerIds) => ({
    mode: Mode.ENDLESS,
    playerIds: allPlayerIds,
    playersGarbage: [],
    playersRenderState: {},
    playersState: {},
    playersUiState: {},
    spectators: [],
    step: Step.WAIT,
    votes: {},
  }),
  actions: {
    bottomDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      // Reset
      reset(playerState)
      // Hold
      playerState.bottom = true
    },
    bottomUp(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      playerState.bottom = false
    },
    centerDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      const renderState = game.playersRenderState[playerId]
      rotate(renderState)
      // Reset
      reset(playerState)
      // Hold
      playerState.center = true
    },
    centerUp(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      playerState.center = false
      playerState.actionSpeedCount = 0
    },
    leftDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      const renderState = game.playersRenderState[playerId]
      moveLeft(renderState)
      // Reset
      reset(playerState)
      // Hold
      playerState.left = true
    },
    leftUp(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      playerState.left = false
      playerState.actionSpeedCount = 0
    },
    ready(vote: Mode, { game, playerId }) {
      if (game.step !== Step.WAIT) {
        return Rune.invalidAction()
      }
      if (game.votes[playerId] === vote) {
        game.votes[playerId] = undefined
      } else {
        game.votes[playerId] = vote
      }
      const votes = Object.values(game.votes).filter((mode) => mode) as Mode[]
      if (votes.length === game.playerIds.length) {
        game.mode = votesArray(votes)
        startRound(game)
      }
    },
    rightDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      const renderState = game.playersRenderState[playerId]
      moveRight(renderState)
      // Reset
      reset(playerState)
      // Hold
      playerState.right = true
    },
    rightUp(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      playerState.right = false
      playerState.actionSpeedCount = 0
    },
    setLocale(locale: string, { game, playerId }) {
      game.persisted[playerId].locale = locale
    },
    setShowControls(showControls: boolean, { game, playerId }) {
      game.persisted[playerId].showControls = showControls
    },
  },
  events: {
    playerJoined(playerId, { game }) {
      game.playerIds.push(playerId)
      if (game.step !== Step.WAIT) {
        // Spectator
        game.spectators.push(playerId)
      }
    },
    playerLeft(playerId, { game }) {
      game.playerIds.splice(game.playerIds.indexOf(playerId), 1)
      if (game.step !== Step.WAIT) {
        if (!game.spectators.includes(playerId)) {
          // Save high score
          saveHighScore(game, playerId, game.playersUiState[playerId].score)
          // Clear
          game.playersGarbage = game.playersGarbage.filter(
            ({ id }) => id !== playerId
          )
          delete game.playersRenderState[playerId]
          delete game.playersState[playerId]
          delete game.playersUiState[playerId]
        } else {
          game.spectators.splice(game.spectators.indexOf(playerId), 1)
        }
      }
    },
  },
  update({ game }) {
    if (game.step !== Step.PLAY) {
      return
    }
    const entries = Object.entries(game.playersState)
    const uiEntries = Object.entries(game.playersUiState)
    const renderEntries = Object.entries(game.playersRenderState)
    // Check game over
    const nonGameOverPlayers = renderEntries.filter(
      ([, renderState]) => !renderState.gameOver
    )
    if (
      (game.mode === Mode.BR && nonGameOverPlayers.length <= 1) ||
      (game.mode === Mode.ENDLESS && nonGameOverPlayers.length === 0)
    ) {
      // High scores
      for (const [id, playerState] of uiEntries) {
        saveHighScore(game, id, playerState.score)
      }
      // Game over
      Rune.gameOver({
        players: Object.fromEntries(
          game.playerIds.map((id) => [id, game.playersUiState[id]?.score ?? 0])
        ),
      })
    }
    // Update loop
    for (const [playerId, playerState] of entries) {
      const uiState = game.playersUiState[playerId]
      const renderState = game.playersRenderState[playerId]
      if (renderState.gameOver) {
        continue
      }
      const speed = getSpeed(Math.floor(playerState.level))
      // Player controls
      if (playerState.center || playerState.left || playerState.right) {
        playerState.actionSpeedCount++
        if (
          playerState.actionSpeedCount >
          Math.min(playerState.actionSpeed, speed)
        ) {
          if (playerState.center) {
            rotate(renderState)
          } else if (playerState.left) {
            moveLeft(renderState)
          } else if (playerState.right) {
            moveRight(renderState)
          }
          playerState.actionSpeedCount = 0
        }
      }
      // Black fall
      playerState.speedCount++
      if (playerState.speedCount > speed || playerState.bottom) {
        const { block, well } = renderState
        block.row = block.row + 1
        if (!isValidMove(well, block)) {
          block.row = block.row - 1
          const result = placeBlock(well, block)
          if (result === true) {
            renderState.gameOver = true
          } else {
            // Sometimes block continue to fall quickly so reset when block is placed
            reset(playerState)
            // Score
            if (result > 0) {
              uiState.clearedLines.push(result)
              uiState.score = Math.min(
                uiState.score + getScore(result, Math.floor(playerState.level)),
                999_999
              )
              // Level increase every 10 rows
              const level = Math.floor(playerState.level + result * 0.1)
              if (level > Math.floor(playerState.level)) {
                playerState.level = level
              } else {
                playerState.level += result * 0.1
              }
            }
            // Next block
            const nextBlock = renderState.sequence.shift()!
            renderState.block = nextBlock
            if (renderState.sequence.length === 0) {
              const sequence = getRandomSequence()
              renderState.sequence = sequence
            }
            // Garbage
            if (game.mode === Mode.BR) {
              let garbage = getGarbage(result)
              const playerGarbage = game.playersGarbage.find(
                ({ id, rows }) => id === playerId && rows.length > 0
              )
              // Cancel garbage
              if (playerGarbage && garbage) {
                const total = playerGarbage.rows.reduce((a, b) => a + b, 0)
                if (total <= garbage) {
                  playerGarbage.rows = []
                  garbage -= total
                } else {
                  playerGarbage.rows = playerGarbage.rows
                    .map((lines) => {
                      const remaining = Math.min(lines - garbage, 0)
                      garbage -= lines
                      return remaining
                    })
                    .filter((lines) => lines)
                }
              }
              // Add garbage to well
              if (playerGarbage) {
                addGarbage(well, playerGarbage.rows)
                playerGarbage.rows = []
              }
              // Send garbage
              if (garbage) {
                const playerGarbage = game.playersGarbage.find(
                  ({ id }) => id !== playerId
                )
                if (playerGarbage) {
                  // Insert garbage and move item at the end of the list
                  playerGarbage.rows.push(garbage)
                  game.playersGarbage.splice(
                    game.playersGarbage.indexOf(playerGarbage),
                    1
                  )
                  game.playersGarbage.push(playerGarbage)
                }
              }
            }
          }
        } else if (playerState.bottom) {
          uiState.score = Math.min(uiState.score + 1, 999_999)
        }
        playerState.speedCount = 0
      }
    }
  },
})
