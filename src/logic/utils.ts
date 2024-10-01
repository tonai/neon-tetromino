import {
  generateId,
  randomInArray,
  shuffleArray,
} from "@tonai/game-utils/server"

import { Block, BlockType, PlayerState, Well } from "../types"
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

export function rotate(playerState: PlayerState) {
  const { block, well } = playerState
  const matrix = rotateMatrix(block.matrix)
  if (isValidMove(well, { ...block, matrix })) {
    block.matrix = matrix
  }
}

export function moveLeft(playerState: PlayerState) {
  const { block, well } = playerState
  const column = block.column - 1
  if (isValidMove(well, { ...block, column })) {
    block.column = column
  }
}

export function moveRight(playerState: PlayerState) {
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
