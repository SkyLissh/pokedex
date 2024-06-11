import type { Type } from "@/schemas/pokemon/type";

export function imageByType(type: Type): string {
  switch (type) {
    case "grass":
      return require("@/assets/svg/grass.svg");
    case "fire":
      return require("@/assets/svg/fire.svg");
    case "water":
      return require("@/assets/svg/water.svg");
    case "electric":
      return require("@/assets/svg/electric.svg");
    case "fighting":
      return require("@/assets/svg/fighting.svg");
    case "flying":
      return require("@/assets/svg/flying.svg");
    case "poison":
      return require("@/assets/svg/poison.svg");
    case "ground":
      return require("@/assets/svg/ground.svg");
    case "psychic":
      return require("@/assets/svg/psychic.svg");
    case "bug":
      return require("@/assets/svg/bug.svg");
    case "rock":
      return require("@/assets/svg/rock.svg");
    case "ghost":
      return require("@/assets/svg/ghost.svg");
    case "dragon":
      return require("@/assets/svg/dragon.svg");
    case "dark":
      return require("@/assets/svg/dark.svg");
    case "steel":
      return require("@/assets/svg/steel.svg");
    case "fairy":
      return require("@/assets/svg/fairy.svg");
    case "normal":
      return require("@/assets/svg/normal.svg");
    case "ice":
      return require("@/assets/svg/ice.svg");
    default:
      return require("@/assets/svg/normal.svg");
  }
}
