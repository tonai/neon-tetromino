import { startRound } from "./logic/game"
import {
  getRandomSequence,
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
    actionSpeed: 3, // Number of frames before next action
    playerIds: allPlayerIds,
    playersReady: [],
    playersState: {},
    speed: 6, // Number of frames before next fall
    step: Step.WAIT,
  }),
  actions: {
    bottomDown(_, { game, playerId }) {
      if (game.step !== Step.PLAY) {
        return Rune.invalidAction()
      }
      const playerState = game.playersState[playerId]
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
    for (const [, playerState] of entries) {
      if (playerState.gameOver) {
        continue
      }
      // Player controls
      if (playerState.center || playerState.left || playerState.right) {
        playerState.actionSpeedCount++
        if (playerState.actionSpeedCount > game.actionSpeed) {
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
      if (playerState.speedCount > game.speed || playerState.bottom) {
        const { block, well } = playerState
        block.row = block.row + 1
        if (!isValidMove(well, block)) {
          block.row = block.row - 1
          const gameOver = placeBlock(well, block)
          if (gameOver) {
            playerState.gameOver = true
          } else {
            const nextBlock = playerState.sequence.shift()!
            playerState.block = nextBlock
            if (playerState.sequence.length === 0) {
              const sequence = getRandomSequence()
              playerState.sequence = sequence
            }
          }
        }
        playerState.speedCount = 0
      }
    }
  },
})
