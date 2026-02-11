/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        source: ["var(--font-source-sans)", "sans-serif"],
        code: ["var(--font-source-code-pro)", "monospace"],
        everest: ["var(--font-aia-everest)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
