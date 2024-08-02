import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      rotate: {
        '-12': '-12deg',
      },
      skew: {
        '-12': '-12deg',
        '12': '12deg',
      },
      colors: {
        'primary': '#FC9D38',
        'secondary': '#0D1A10',
        'tertiary': '#f5f5f5',
        'accent': '#050302',
      },
      clipPath: {
        // Parallelogram shapes
        'parallelogram-xs': 'polygon(2.5% 0%, 100% 0%, 97.5% 100%, 0% 100%)',
        'parallelogram-sm': 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
        'parallelogram-md': 'polygon(05% 0%, 100% 0%, 95% 100%, 0% 100%)',
        'parallelogram-lg': 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
        // Custom
        'parallelogram-breadcrumb': 'polygon(08% 0%, 100% 0%, 92% 100%, 0% 100%)',
        // Right side angles
        'angle-r-sm': 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
        'angle-r-md': 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        'angle-r-lg': 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
        'angle-r-xl': 'polygon(0 0, 100% 0, 75% 100%, 0% 100%)',
        // Left side angles
        'angle-l-sm': 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        'angle-l-md': 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)',
        'angle-l-lg': 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
        'angle-l-xl': 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        // Parallelogram shapes
        '.clip-parallelogram-xs': {
          'clip-path': 'polygon(2.5% 0%, 100% 0%, 97.5% 100%, 0% 100%)',
        },
        '.clip-parallelogram-sm': {
          'clip-path': 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
        },
        '.clip-parallelogram-md': {
          'clip-path': 'polygon(05% 0%, 100% 0%, 95% 100%, 0% 100%)',
        },
        '.clip-parallelogram-lg': {
          'clip-path': 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
        },
        // Custom
        '.clip-parallelogram-breadcrumb': {
          'clip-path': 'polygon(08% 0%, 100% 0%, 92% 100%, 0% 100%)',
        },
        // Right side angles
        '.clip-angle-r-sm': {
          'clip-path': 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
        },
        '.clip-angle-r-md': {
          'clip-path': 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        },
        '.clip-angle-r-lg': {
          'clip-path': 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
        },
        '.clip-angle-r-xl': {
          'clip-path': 'polygon(0 0, 100% 0, 75% 100%, 0% 100%)',
        },
        // Left side angles
        '.clip-angle-l-sm': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        },
        '.clip-angle-l-md': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)',
        },
        '.clip-angle-l-lg': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
        },
        '.clip-angle-l-xl': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)',
        },
      });
    },
  ],
};

export default config;