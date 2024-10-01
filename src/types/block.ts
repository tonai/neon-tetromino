export enum BlockType {
  I = "#00f0f0", // cyan
  O = "#f0f000", // yellow
  T = "#a000f0", // violet
  S = "#00f000", // green
  Z = "#f00000", // red
  J = "#0000f0", // blue
  L = "#f0a000", // orange
}

export enum GarbageType {
  G = "#999999",
}

export interface Block {
  column: number
  id: string
  matrix: number[][]
  type: BlockType
  row: number
}
