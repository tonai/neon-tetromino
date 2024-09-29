import { PlayerId, RuneClient } from "rune-sdk"
import { Block, BlockType } from "./block"

export enum Step {
  PLAY,
  WAIT,
}

export type Well = (BlockType | null)[][]

export interface PlayerState {
  block: Block
  gameOver: boolean
  score: number
  sequence: Block[]
  well: Well
}

export interface GameState {
  frameCount: number
  playerIds: PlayerId[]
  playersReady: PlayerId[]
  playersState: Record<PlayerId, PlayerState>
  speed: number
  step: Step
}

type GameActions = {
  ready: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}
