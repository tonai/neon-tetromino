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
  rotate,
} from "./logic/utils"
import { Step } from "./types"

const updatesPerSecond = 10

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  updatesPerSecond,
  setup: (allPlayerIds) => ({
    playerIds: allPlayerIds,
    playersGarbage: [],
    playersReady: [],
    playersState: {},
    step: Step.WAIT,
  }),
  actions: {
    bottomDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      // Reset
      playerState.bottom = false
      playerState.center = false
      playerState.left = false
      playerState.right = false
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
      rotate(playerState)
      // Reset
      playerState.bottom = false
      playerState.center = false
      playerState.left = false
      playerState.right = false
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
      moveLeft(playerState)
      // Reset
      playerState.bottom = false
      playerState.center = false
      playerState.left = false
      playerState.right = false
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
    ready(_, { game, playerId }) {
      if (game.step !== Step.WAIT) {
        return Rune.invalidAction()
      }
      startRound(game)
      /*const index = game.playersReady.indexOf(playerId)
      if (index !== -1) {
        game.playersReady.splice(index, 1)
      } else {
        game.playersReady.push(playerId)
        if (game.playersReady.length === game.playerIds.length) {
          startRound(game)
        }
      }*/
    },
    rightDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
      moveRight(playerState)
      // Reset
      playerState.bottom = false
      playerState.center = false
      playerState.left = false
      playerState.right = false
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
  },
  events: {
    playerJoined(playerId, { game }) {
      if (game.step === Step.WAIT) {
        game.playerIds.push(playerId)
      } else {
        // Spectator (TODO)
      }
    },
    playerLeft(playerId, { game }) {
      if (game.step === Step.WAIT) {
        game.playerIds.splice(game.playerIds.indexOf(playerId), 1)
      } else {
        // If a player left during the game (TODO)
      }
    },
  },
  update({ game }) {
    if (game.step !== Step.PLAY) {
      return
    }
    const entries = Object.entries(game.playersState)
    // Check GameOver
    const nonGameOverPlayers = entries.filter(
      ([, playerState]) => !playerState.gameOver
    )
    if (nonGameOverPlayers.length <= 1) {
      Rune.gameOver({
        players: Object.fromEntries(
          entries.map(([id, playerState]) => [id, playerState.score])
        ),
      })
    }
    // Update loop
    for (const [playerId, playerState] of entries) {
      if (playerState.gameOver) {
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
            rotate(playerState)
          } else if (playerState.left) {
            moveLeft(playerState)
          } else if (playerState.right) {
            moveRight(playerState)
          }
          playerState.actionSpeedCount = 0
        }
      }
      // Black fall
      playerState.speedCount++
      if (playerState.speedCount > speed || playerState.bottom) {
        const { block, well } = playerState
        block.row = block.row + 1
        if (!isValidMove(well, block)) {
          block.row = block.row - 1
          const result = placeBlock(well, block)
          if (result === true) {
            playerState.gameOver = true
          } else {
            // Score
            if (result > 0) {
              playerState.clearedLines.push(result)
              playerState.score += getScore(
                result,
                Math.floor(playerState.level)
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
            const nextBlock = playerState.sequence.shift()!
            playerState.block = nextBlock
            if (playerState.sequence.length === 0) {
              const sequence = getRandomSequence()
              playerState.sequence = sequence
            }
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
        } else if (playerState.bottom) {
          playerState.score += 1
        }
        playerState.speedCount = 0
      }
    }
  },
})
