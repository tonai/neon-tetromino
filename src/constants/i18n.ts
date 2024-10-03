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
  fr: {
    help: "aide",
    Endless: "Sans fin",
    "Battle Royale": "Bataille Royale",
    "[help]": "Appuyez ou maintenez l'une des 4 régions pour déclencher l'action",
    "move left": "aller à gauche",
    rotate: "tourner",
    "move right": "aller à droite",
    "speed up": "accélerer",
  },
  ru: {
    help: "помощь",
    Endless: "Бесконечный",
    "Battle Royale": "Королевская битва",
    "[help]": "Нажмите или удерживайте одну из 4 областей, чтобы запустить действие.",
    "move left": "двигаться влево",
    rotate: "вращать",
    "move right": "двигаться вправо",
    "speed up": "ускорить",
  },
  es: {
    help: "ayuda",
    Endless: "Sin fin",
    "Battle Royale": "Batalla real",
    "[help]": "Toque o mantenga presionada una de las 4 regiones para activar la acción.",
    "move left": "moverse a la izquierda",
    rotate: "girar",
    "move right": "moverse a la derecha",
    "speed up": "acelerar",
  },
  pt: {
    help: "ajuda",
    Endless: "Sem fim",
    "Battle Royale": "Batalha real",
    "[help]": "Toque ou mantenha pressionada uma das 4 regiões para acionar a ação",
    "move left": "deslocar para a esquerda",
    rotate: "girar",
    "move right": "deslocar para a direita",
    "speed up": "acelerar",
  },
  cn: {
    help: "帮助",
    Endless: "无穷无尽",
    "Battle Royale": "大逃杀",
    "[help]": "点击或按住 4 个区域之一即可触发操作",
    "move left": "向左移动",
    rotate: "旋转",
    "move right": "向右移动",
    "speed up": "加快",
  },
}
