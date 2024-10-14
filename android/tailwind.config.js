/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        prmt: ["PromptRegular", "sans-serif"],
        prmtmedium: ["PromptMedium", "sans-serif"],
        prmtbold: ["PromptBold", "sans-serif"],
        prmtlight: ["PromptLight", "sans-serif"],
        prmtextralight: ["PromptExtraLight", "sans-serif"],
      }
    },
  },
  plugins: [],
}

