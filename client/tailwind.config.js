/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate50: "var(--slate-50)",
        slate100: "var(--slate-100)",
        slate200: "var(--slate-200)",
        slate300: "var(--slate-300)",
        slate400: "var(--slate-400)",
        slate500: "var(--slate-500)",
        slate600: "var(--slate-600)",
        slate700: "var(--slate-700)",
        slate800: "var(--slate-800)",
        slate900: "var(--slate-900)",
        slate950: "var(--slate-950)",
      },
    },
  },
  plugins: [],
};
