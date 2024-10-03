import { ComponentType } from "react"

import Uk from "../icons/Uk"
import Fr from "../icons/Fr"
import Ru from "../icons/Ru"
import Es from "../icons/Es"
import Pt from "../icons/Pt"
import Cn from "../icons/Cn"

export const locales: Record<string, ComponentType> = {
  en: Uk,
  fr: Fr,
  ru: Ru,
  es: Es,
  pt: Pt,
  cn: Cn,
}
export type Locale = keyof typeof locales

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    help: "help",
    Endless: "Endless",
    "Battle Royale": "Battle Royale",
    "[help]": "Tap or hold in one of the 4 regions to trigger the action",
    "move left": "move left",
    rotate: "rotate",
    "move right": "move right",
    "speed up": "speed up",
  },
  fr: {},
  ru: {},
  es: {},
  pt: {},
  cn: {},
}
