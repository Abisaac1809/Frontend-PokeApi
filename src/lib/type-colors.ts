export type TypeColor = { bg: string; text: string };

export const TYPE_COLORS: Record<string, TypeColor> = {
  fire: { bg: "#C62828", text: "#FFCDD2" },
  water: { bg: "#1565C0", text: "#BBDEFB" },
  grass: { bg: "#2E7D32", text: "#C8E6C9" },
  electric: { bg: "#F9A825", text: "#4E342E" },
  poison: { bg: "#6A1B9A", text: "#E1BEE7" },
  normal: { bg: "#37474F", text: "#ECEFF1" },
  dragon: { bg: "#00695C", text: "#B2DFDB" },
  psychic: { bg: "#4527A0", text: "#D1C4E9" },
  bug: { bg: "#558B2F", text: "#DCEDC8" },
  rock: { bg: "#4E342E", text: "#EFEBE9" },
  steel: { bg: "#455A64", text: "#ECEFF1" },
  ghost: { bg: "#263238", text: "#CFD8DC" },
  flying: { bg: "#5C6BC0", text: "#C5CAE9" },
  fairy: { bg: "#AD1457", text: "#F8BBD0" },
  ice: { bg: "#0277BD", text: "#B3E5FC" },
  fighting: { bg: "#BF360C", text: "#FFCCBC" },
  ground: { bg: "#8D6E63", text: "#D7CCC8" },
  dark: { bg: "#212121", text: "#BDBDBD" },
};

export const UNKNOWN_TYPE_COLOR: TypeColor = { bg: "#37474F", text: "#ECEFF1" };

export function getTypeColor(name: string): TypeColor {
  return TYPE_COLORS[name.toLowerCase()] ?? UNKNOWN_TYPE_COLOR;
}
