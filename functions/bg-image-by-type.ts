import type { Type } from "@/schemas/pokemon";

export const bgImageByType = (type: Type) => {
  switch (type) {
    case "normal":
      return require("@/assets/svg/normal_bg.svg");
    case "fighting":
      return require("@/assets/svg/fighting_bg.svg");
    case "flying":
      return require("@/assets/svg/flying_bg.svg");
    case "poison":
      return require("@/assets/svg/poison_bg.svg");
    case "ground":
      return require("@/assets/svg/ground_bg.svg");
    case "rock":
      return require("@/assets/svg/rock_bg.svg");
    case "bug":
      return require("@/assets/svg/bug_bg.svg");
    case "ghost":
      return require("@/assets/svg/ghost_bg.svg");
    case "steel":
      return require("@/assets/svg/steel_bg.svg");
    case "fire":
      return require("@/assets/svg/fire_bg.svg");
    case "water":
      return require("@/assets/svg/water_bg.svg");
    case "grass":
      return require("@/assets/svg/grass_bg.svg");
    case "electric":
      return require("@/assets/svg/electric_bg.svg");
    case "psychic":
      return require("@/assets/svg/psychic_bg.svg");
    case "ice":
      return require("@/assets/svg/ice_bg.svg");
    case "dragon":
      return require("@/assets/svg/dragon_bg.svg");
    case "dark":
      return require("@/assets/svg/dark_bg.svg");
    case "fairy":
      return require("@/assets/svg/fairy_bg.svg");
    default:
      return require("@/assets/svg/normal_bg.svg");
  }
};
