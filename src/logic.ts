import { startRound } from "./logic/game"
import { getRandomSequence, isValidMove, placeBlock } from "./logic/utils"
import { Step } from "./types"

const updatesPerSecond = 10

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  updatesPerSecond,
  setup: (allPlayerIds) => ({
    frameCount: 0,
    playerIds: allPlayerIds,
    playersReady: [],
    playersState: {},
    speed: 6, // Number of frames before next fall
    step: Step.WAIT,
  }),
  actions: {
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
    game.frameCount++
    if (game.frameCount > game.speed) {
      const entries = Object.entries(game.playersState)
      for (const [, playerState] of entries) {
        if (playerState.gameOver) {
          continue
        }
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
      }
      game.frameCount = 0
    }
  },
})
