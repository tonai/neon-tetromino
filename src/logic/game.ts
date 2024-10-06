import { GameState, Step } from "../types"
import { getRandomSequence, getWell } from "./utils"

export function startRound(game: GameState) {
  game.step = Step.PLAY

  game.playersRenderState = Object.fromEntries(
    game.playerIds.map((id) => {
      const sequence = getRandomSequence()
      const block = sequence.shift()!
      return [id, { block, gameOver: false, sequence, well: getWell() }]
    })
  )

  game.playersState = Object.fromEntries(
    game.playerIds.map((id) => [
      id,
      {
        actionSpeed: 2,
        actionSpeedCount: 0,
        bottom: false,
        center: false,
        left: false,
        level: 1,
        right: false,
        speedCount: 0,
      },
    ])
  )

  game.playersUiState = Object.fromEntries(
    game.playerIds.map((id) => [id, { clearedLines: [], score: 0 }])
  )

  game.playersGarbage = game.playerIds.map((id) => ({ id, garbages: [] }))
}
