import { PlayerId, RuneClient } from "rune-sdk"
import { Block, BlockType } from "./block"

export enum Step {
  PLAY,
  WAIT,
}

export type Well = (BlockType | null)[][]

export interface PlayerState {
  actionSpeedCount: number
  bottom: boolean
  block: Block
  center: boolean
  gameOver: boolean
  left: boolean
  right: boolean
  score: number
  sequence: Block[]
  speedCount: number
  well: Well
}

export interface GameState {
  actionSpeed: number
  playerIds: PlayerId[]
  playersReady: PlayerId[]
  playersState: Record<PlayerId, PlayerState>
  speed: number
  step: Step
}

type GameActions = {
  bottomDown: () => void
  bottomUp: () => void
  centerDown: () => void
  centerUp: () => void
  leftDown: () => void
  leftUp: () => void
  ready: () => void
  rightDown: () => void
  rightUp: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}
