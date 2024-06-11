import type { Type } from "@/schemas/pokemon/type";

export function colorByType(type: Type): string {
  switch (type) {
    case "normal":
      return "bg-[#919AA2]";
    case "fighting":
      return "bg-[#CE416B]";
    case "flying":
      return "bg-[#89AAE3]";
    case "poison":
      return "bg-[#B567CE]";
    case "ground":
      return "bg-[#D97845]";
    case "rock":
      return "bg-[#C5B78C]";
    case "bug":
      return "bg-[#91C12F]";
    case "ghost":
      return "bg-[#5269AD]";
    case "steel":
      return "bg-[#5A8EA2]";
    case "fire":
      return "bg-[#FF9D55]";
    case "water":
      return "bg-[#5090D6]";
    case "grass":
      return "bg-[#63BC5A]";
    case "electric":
      return "bg-[#F4D23C]";
    case "psychic":
      return "bg-[#FA7179]";
    case "ice":
      return "bg-[#73CEC0]";
    case "dragon":
      return "bg-[#0B6DC3]";
    case "dark":
      return "bg-[#5A5465]";
    case "fairy":
      return "bg-[#EC8FE6]";
    default:
      return "bg-[#919AA2]";
  }
}
