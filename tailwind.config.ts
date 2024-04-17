import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-green': '#0D1A10',
        'winners-orange': '#FC9D38',
      },
    },
  },
  plugins: [],
} satisfies Config;
