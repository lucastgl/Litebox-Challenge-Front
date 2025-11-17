import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

const config = {
  plugins: [heroui()],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./mocks/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|chip|input|modal|ripple|spinner|form).js"
  ],
  theme: {
    extend: {
      colors: {
        brandBackground: "#040404",
        brandSurface: "#0f0f0f",
        brandSurfaceAlt: "#161616",
        brandBorder: "#2a2a2a",
        brandPurple: "#9b63ff",
        brandPurpleDark: "#7f4fd4",
        brandLime: "#d4ff3f",
        brandLimeDark: "#a2d92a",
        brandCyan: "#64f8ff",
        brandAccent: "#ff5ed0",
        brandText: "#f4f4f5",
        brandTextMuted: "#a1a1aa",
        lemonGreen: "#D8F34E",
        mainPurple: "#9C73F7",
        darkGray: "#595959",
        lightGray: "#8C8C8C",
      },
    },
  },
} satisfies Config;

export default config;

