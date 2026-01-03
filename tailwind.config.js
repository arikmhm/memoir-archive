/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // The White Cube Palette
        canvas: "#FAFAFA", // Background Utama (Off-White)
        ink: {
          DEFAULT: "#050505", // Hitam Hampir Pekat (Teks Utama)
          light: "#666666", // Abu-abu (Metadata)
        },
      },
      fontFamily: {
        // Definisi Font sesuai Brief
        serif: ['"Playfair Display"', "serif"], // Header/Logo
        sans: ["Inter", "sans-serif"], // UI/Buttons
        mono: ['"Courier Prime"', "monospace"], // Data/Tech
      },
      boxShadow: {
        // Efek kertas melayang (Soft & Deep)
        art: "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        blink: "blink 1.5s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
