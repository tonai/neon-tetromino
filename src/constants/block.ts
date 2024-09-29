import { BlockType } from "../types";

export const tetrominos = {
  [BlockType.I]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [BlockType.J]: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [BlockType.L]: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [BlockType.O]: [
    [1, 1],
    [1, 1],
  ],
  [BlockType.S]: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [BlockType.Z]: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [BlockType.T]: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
}
