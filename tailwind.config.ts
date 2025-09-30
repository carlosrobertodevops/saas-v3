/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "blue-start": "#4A90E2",
        "purple-end": "#9013FE",
      },
    },
  },
  plugins: [],
};
export default config;
