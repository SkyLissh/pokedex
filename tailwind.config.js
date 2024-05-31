import { platformSelect } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
export default {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        system: platformSelect({
          ios: "Poppins-Regular",
          android: "Poppins-Regular",
          web: "Poppins",
          default: "ui-sans-serif",
        }),
      },
    },
  },
  plugins: [],
};
