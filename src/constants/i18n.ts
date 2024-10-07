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
    "[Endless]": "Keep playing until you can no longer place blocks",
    "Battle Royale": "Battle Royale",
    "[Battle Royale]": "Strive to be the last player standing",
    "[help]": "Tap or hold in any of the four regions to perform an action",
    "move left": "move left",
    rotate: "rotate",
    "move right": "move right",
    "speed up": "speed up",
    "Show controls regions": "Show Control Regions",
    "Best:": "Best:",
    "You are spectating": "You are spectating",
    Level: "Level",
  },
  fr: {
    help: "aide",
    Endless: "Sans fin",
    "[Endless]":
      "Jouez jusqu'à ce que vous ne puissiez plus placer de nouveaux blocs",
    "Battle Royale": "Battle Royale",
    "[Battle Royale]": "Essayez d'être le dernier en lice",
    "[help]":
      "Appuyez ou maintenez dans l'une des 4 zones pour déclencher l'action",
    "move left": "aller à gauche",
    rotate: "tourner",
    "move right": "aller à droite",
    "speed up": "accélerer",
    "Show controls regions": "Afficher les zones de contrôle",
    "Best:": "Meilleur :",
    "You are spectating": "Vous êtes spectateur",
    Level: "Niveau",
  },
  ru: {
    help: "помощь",
    Endless: "Бесконечный",
    "[Endless]": "Играйте, пока не сможете разместить новые блоки",
    "Battle Royale": "Королевская битва",
    "[Battle Royale]": "Постарайтесь остаться последним выжившим",
    "[help]":
      "Нажмите или удерживайте в одной из 4 зон, чтобы выполнить действие",
    "move left": "двигаться влево",
    rotate: "вращать",
    "move right": "двигаться вправо",
    "speed up": "ускорить",
    "Show controls regions": "Показать области управления",
    "Best:": "Лучший:",
    "You are spectating": "Вы наблюдаете",
    Level: "Уровень",
  },
  es: {
    help: "ayuda",
    Endless: "Infinito",
    "[Endless]": "Juega hasta que no puedas colocar más bloques",
    "Battle Royale": "Battle Royale",
    "[Battle Royale]": "Intenta ser el último en pie",
    "[help]":
      "Toca o mantén pulsado en una de las 4 regiones para activar la acción",
    "move left": "mover a la izquierda",
    rotate: "girar",
    "move right": "mover a la derecha",
    "speed up": "acelerar",
    "Show controls regions": "Mostrar zonas de control",
    "Best:": "Mejor:",
    "You are spectating": "Estás como espectador",
    Level: "Nivel",
  },
  pt: {
    help: "ajuda",
    Endless: "Sem fim",
    "[Endless]": "Jogue até não conseguir colocar novos blocos",
    "Battle Royale": "Battle Royale",
    "[Battle Royale]": "Tente ser o último em pé",
    "[help]":
      "Toque ou mantenha pressionado em uma das 4 regiões para executar a ação",
    "move left": "mover para a esquerda",
    rotate: "girar",
    "move right": "mover para a direita",
    "speed up": "acelerar",
    "Show controls regions": "Mostrar regiões de controle",
    "Best:": "Melhor:",
    "You are spectating": "Você está assistindo",
    Level: "Nível",
  },
  cn: {
    help: "帮助",
    Endless: "无尽模式",
    "[Endless]": "游戏直到无法放置新的方块",
    "Battle Royale": "大逃杀模式",
    "[Battle Royale]": "努力成为最后的幸存者",
    "[help]": "点击或长按四个区域之一以触发操作",
    "move left": "向左移动",
    rotate: "旋转",
    "move right": "向右移动",
    "speed up": "加速",
    "Show controls regions": "显示控制区域",
    "Best:": "最佳成绩：",
    "You are spectating": "你正在旁观",
    Level: "等级",
  },
}
