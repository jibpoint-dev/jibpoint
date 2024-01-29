/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9569EC",
        secondary: "#03D394",
        primaryBg: "#0B0A1D",
        gray: "#0b1016",
        royalblue: {
          "100": "#0264f9",
          "200": "rgba(2, 100, 249, 0.21)",
          "300": "rgba(2, 100, 249, 0.15)",
          "400": "rgba(2, 100, 249, 0.5)",
          "500": "rgba(2, 100, 249, 0.1)",
        },
        white: "#fff",
        palevioletred: "#ff709e",
        lavender: "#d8e9f6",
        gainsboro: "#e6e6e6",
        modelBg: "rgba(0, 0, 0, 0.60)",
        "token-color-contrainer-light": "#323c4d",
        "token-color-contrainer-primary": "#2d59fa",
        "token-color-text-white": "#fff",
        "token-color-text-gray-light": "#c1c7d1",
        "token-color-contrainer-dark": "#0b1016",
        "token-color-text-gray-medium": "#7f8899",
        "token-color-text-gray-drak": "#4c5667",
        "token-color-text-secondary": "#faac33",
        orange: "rgba(250, 172, 51, 0.2)",
        "token-color-stroke-medium": "#98a2b3",
        "token-color-contrainer-medium": "#192334",
        "token-color-contrainer-black": "#02070d",
        "token-color-stroke-dark": "#323c4d",
        "token-color-contrainer-medium": "#192334",
        "token-color-text-gray-medium": "#7f8899",
        "token-color-text-alert": "#ff6f6f",
        "token-color-text-white": "#fff",
      },
      spacing: {},
      fontFamily: {
        medium: "'Noto Sans Thai'",
        inter: "Inter",
      },
      borderRadius: {
        xl: "20px",
        "6xl": "25px",
        "11xl": "30px",
        "8xs": "5px",
        lg: "18px",
        "80xl": "99px",
        "21xl": "40px",
        "13xl": "32px",
        sm: "14px",
      },
    },
    fontSize: {
      xs: "12px",
      base: "16px",
      sm: "14px",
      xl: "20px",
      "31xl": "50px",
      "5xl": "24px",
      inherit: "inherit",
      xl: "20px",
      base: "16px",
      "29xl": "48px",
      lg: "18px",
      "9xl": "28px",
      "13xl": "32px",
      "40xl": "60px",
      "61xl": "80px",
    },
    screens: {
      xs: "320px",
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
