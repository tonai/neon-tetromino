import { GameStateWithPersisted, PlayerId } from "rune-sdk"
import {
  generateId,
  randomInArray,
  shuffleArray,
  unusedRandomInt,
} from "@tonai/game-utils/server"

import {
  Block,
  BlockType,
  GameState,
  Garbage,
  GarbageType,
  Persisted,
  PlayerRenderState,
  PlayerState,
  Well,
} from "../types"
import { tetrominos } from "../constants"

const types = Object.keys(BlockType) as (keyof typeof BlockType)[]

export function getRandomBlockType(): BlockType {
  const key = randomInArray(types)
  return BlockType[key]
}

export function getBlock(type: BlockType): Block {
  const matrix = tetrominos[type].map((line) => [...line])
  const column = 5 - Math.ceil(matrix[0].length / 2)
  const row = type === BlockType.I ? 1 : 0
  return {
    column,
    id: generateId(),
    matrix,
    row,
    type,
  }
}

export function getRandomSequence(): Block[] {
  const sequence = Object.values(BlockType)
  shuffleArray(sequence)
  return sequence.map(getBlock)
}

export function getWell() {
  const well: Well = []
  for (let row = 0; row < 22; row++) {
    well[row] = []

    for (let col = 0; col < 10; col++) {
      well[row][col] = null
    }
  }
  return well
}

export function isValidMove(well: Well, block: Block) {
  for (let row = 0; row < block.matrix.length; row++) {
    for (let col = 0; col < block.matrix[row].length; col++) {
      if (
        block.matrix[row][col] &&
        // outside the game bounds
        (block.column + col < 0 ||
          block.column + col >= well[0].length ||
          block.row + row >= well.length ||
          // collides with another piece
          well[block.row + row][block.column + col])
      ) {
        return false
      }
    }
  }

  return true
}

export function placeBlock(well: Well, block: Block): number | true {
  for (let row = 0; row < block.matrix.length; row++) {
    for (let col = 0; col < block.matrix[row].length; col++) {
      if (block.matrix[row][col]) {
        // game over if piece has any part offscreen
        if (block.row + row < 2) {
          return true
        }

        well[block.row + row][block.column + col] = block.type
      }
    }
  }

  // check for line clears starting from the bottom and working our way up
  let lineCleared = 0
  for (let row = well.length - 1; row >= 2; ) {
    if (well[row].every((cell) => cell)) {
      lineCleared++
      // drop every row above this one
      for (let r = row - 1; r >= 0; r--) {
        for (let c = 0; c < well[r].length; c++) {
          well[r + 1][c] = well[r][c]
        }
      }
    } else {
      row--
    }
  }

  return lineCleared
}

export function rotateMatrix(matrix: number[][]) {
  const N = matrix.length - 1
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]))
  return result
}

export function rotate(playerState: PlayerRenderState) {
  const { block, well } = playerState
  const matrix = rotateMatrix(block.matrix)
  if (isValidMove(well, { ...block, matrix })) {
    block.matrix = matrix
  }
}

export function moveLeft(playerState: PlayerRenderState) {
  const { block, well } = playerState
  const column = block.column - 1
  if (isValidMove(well, { ...block, column })) {
    block.column = column
  }
}

export function moveRight(playerState: PlayerRenderState) {
  const { block, well } = playerState
  const column = block.column + 1
  if (isValidMove(well, { ...block, column })) {
    block.column = column
  }
}

export function getSpeed(level: number) {
  return Math.max(10 - level, 0)
}

export function getScore(lineCleared: number, level: number) {
  switch (lineCleared) {
    case 4:
      return 1200 * (1 + level)
    case 3:
      return 300 * (1 + level)
    case 2:
      return 100 * (1 + level)
    default:
      return 40 * (1 + level)
  }
}

export function getGarbage(lineCleared: number) {
  switch (lineCleared) {
    case 4:
      return 4
    case 3:
      return 2
    case 2:
      return 1
    default:
      return 0
  }
}

export function addGarbage(well: Well, garbages: Garbage[]): boolean {
  const holes = []
  const total = garbages.reduce((a, b) => a + b.rows, 0)
  const out = well.slice(0, total).some((row) => row.some((cell) => cell))
  for (const garbage of garbages) {
    const holeIndex = unusedRandomInt(holes, 9)
    holes.push(holeIndex)
    // Move up
    for (let row = garbage.rows; row <= well.length - 1; row++) {
      for (let c = 0; c < well[row].length; c++) {
        well[row - garbage.rows][c] = well[row][c]
      }
    }
    // Insert
    for (
      let row = well.length - 1;
      row > well.length - 1 - garbage.rows;
      row--
    ) {
      for (let c = 0; c < well[row].length; c++) {
        well[row][c] = c !== holeIndex ? GarbageType.G : null
      }
    }
  }
  return out
}

export function saveHighScore(
  game: GameStateWithPersisted<GameState, Persisted>,
  id: PlayerId,
  score: number
) {
  let { highScores } = game.persisted[id]
  if (!highScores) {
    highScores = {}
  }
  const prevScore = highScores![game.mode]
  if (!prevScore || prevScore < score) {
    highScores[game.mode] = score
    game.persisted[id].highScores = highScores
  }
}

export function reset(playerState: PlayerState) {
  playerState.bottom = false
  playerState.center = false
  playerState.left = false
  playerState.right = false
}

export function sendGarbage(game: GameState, rows: number, playerId: string) {
  const playerGarbage = game.playersGarbage.find(({ id }) => id !== playerId)
  if (playerGarbage) {
    // Insert garbage and move item at the end of the list
    playerGarbage.garbages.push({
      from: playerId,
      id: generateId(),
      rows,
    })
    game.playersGarbage.splice(game.playersGarbage.indexOf(playerGarbage), 1)
    game.playersGarbage.push(playerGarbage)
  }
}
