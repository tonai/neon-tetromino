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
    "[Endless]": "Play until you can't place new blocks",
    "Battle Royale": "Battle Royale",
    "[Battle Royale]": "Try to be the last standing",
    "[help]": "Tap or hold in one of the 4 regions to trigger the action",
    "move left": "move left",
    rotate: "rotate",
    "move right": "move right",
    "speed up": "speed up",
    "Show controls regions": "Show controls regions",
    "Best:": "Best:",
    "You are spectating": "You are spectating",
  },
  fr: {
    help: "aide",
    Endless: "Sans fin",
    "[Endless]":
      "Jouez jusqu'à ce que vous ne puissiez plus placer de nouveaux blocs",
    "Battle Royale": "Bataille Royale",
    "[Battle Royale]": "Essayez d'être le dernier debout",
    "[help]":
      "Appuyez ou maintenez l'une des 4 régions pour déclencher l'action",
    "move left": "aller à gauche",
    rotate: "tourner",
    "move right": "aller à droite",
    "speed up": "accélerer",
    "Show controls regions": "Afficher les régions de contrôle",
    "Best:": "Meilleur :",
    "You are spectating": "Vous êtes spectateur",
  },
  ru: {
    help: "помощь",
    Endless: "Бесконечный",
    "[Endless]": "Играйте до тех пор, пока не сможете размещать новые блоки.",
    "Battle Royale": "Королевская битва",
    "[Battle Royale]": "Постарайся остаться последним выжившим.",
    "[help]":
      "Нажмите или удерживайте одну из 4 областей, чтобы запустить действие.",
    "move left": "двигаться влево",
    rotate: "вращать",
    "move right": "двигаться вправо",
    "speed up": "ускорить",
    "Show controls regions": "Показать области управления",
    "Best:": "Лучший:",
    "You are spectating": "Вы наблюдаете",
  },
  es: {
    help: "ayuda",
    Endless: "Sin fin",
    "[Endless]": "Juega hasta que no puedas colocar nuevos bloques",
    "Battle Royale": "Batalla real",
    "[Battle Royale]": "Intenta ser el último en pie",
    "[help]":
      "Toque o mantenga presionada una de las 4 regiones para activar la acción.",
    "move left": "moverse a la izquierda",
    rotate: "girar",
    "move right": "moverse a la derecha",
    "speed up": "acelerar",
    "Show controls regions": "Mostrar regiones de control",
    "Best:": "Mejor:",
    "You are spectating": "Estás observando",
  },
  pt: {
    help: "ajuda",
    Endless: "Sem fim",
    "[Endless]": "Jogue até não conseguir colocar novos blocos",
    "Battle Royale": "Batalha real",
    "[Battle Royale]": "Tente ser o último sobrevivente",
    "[help]":
      "Toque ou mantenha pressionada uma das 4 regiões para acionar a ação",
    "move left": "deslocar para a esquerda",
    rotate: "girar",
    "move right": "deslocar para a direita",
    "speed up": "acelerar",
    "Show controls regions": "Mostrar regiões de controlos",
    "Best:": "Melhor:",
    "You are spectating": "Você está a assistir",
  },
  cn: {
    help: "帮助",
    Endless: "无穷无尽",
    "[Endless]": "玩到无法放置新方块为止",
    "Battle Royale": "大逃杀",
    "[Battle Royale]": "努力坚持到最后",
    "[help]": "点击或按住 4 个区域之一即可触发操作",
    "move left": "向左移动",
    rotate: "旋转",
    "move right": "向右移动",
    "speed up": "加快",
    "Show controls regions": "显示控制区域",
    "Best:": "最佳成绩：",
    "You are spectating": "您正在观看",
  },
}
