import { GameState, Step } from "../types"
import { getRandomSequence, getWell } from "./utils"

export function startRound(game: GameState) {
  game.step = Step.PLAY
  game.playersState = Object.fromEntries(
    game.playerIds.map((id) => {
      const sequence = getRandomSequence()
      const block = sequence.shift()!
      return [
        id,
        {
          actionSpeedCount: 0,
          block,
          bottom: false,
          center: false,
          gameOver: false,
          left: false,
          right: false,
          score: 0,
          sequence,
          speedCount: 0,
          well: getWell(),
        },
      ]
    })
  )
}
