import { useEffect, useState } from "react";
import type { ImageColorsResult } from "react-native-image-colors";
import { getColors } from "react-native-image-colors";

export const useImageColors = (url: string) => {
  const [colors, setColors] = useState<ImageColorsResult>();

  useEffect(() => {
    getColors(url, {
      fallback: "#ffffff",
      cache: true,
      key: url,
    }).then(setColors);
  }, [url]);

  if (colors?.platform === "android") return colors.dominant;
  if (colors?.platform === "ios") return colors.background;

  return undefined;
};
