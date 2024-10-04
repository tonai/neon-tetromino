import { PlayerId, RuneClient } from "rune-sdk"
import { Block, BlockType, GarbageType } from "./block"

export enum Step {
  PLAY,
  WAIT,
}

export enum Mode {
  ENDLESS = "Endless",
  BR = "Battle Royale",
}

export type Well = (BlockType | GarbageType | null)[][]

export interface PlayerState {
  actionSpeed: number // Number of frames before next action
  actionSpeedCount: number
  bottom: boolean
  block: Block
  center: boolean
  clearedLines: number[]
  gameOver: boolean
  left: boolean
  level: number
  right: boolean
  score: number
  sequence: Block[]
  speedCount: number
  well: Well
}

export interface PlayerGarbage {
  id: PlayerId
  rows: number[]
}

export interface GameState {
  mode: Mode
  playerIds: PlayerId[]
  playersGarbage: PlayerGarbage[]
  playersState: Record<PlayerId, PlayerState>
  step: Step
  votes: Record<PlayerId, Mode | undefined>
}

type GameActions = {
  bottomDown: () => void
  bottomUp: () => void
  centerDown: () => void
  centerUp: () => void
  leftDown: () => void
  leftUp: () => void
  ready: (vote: Mode) => void
  rightDown: () => void
  rightUp: () => void
  setLocale: (locale: string) => void
  setShowControls: (showControls: boolean) => void
}

export type Persisted = {
  highScores?: Partial<Record<Mode, number>>
  locale?: string
  showControls?: boolean
}

declare global {
  const Rune: RuneClient<GameState, GameActions, Persisted>
}
