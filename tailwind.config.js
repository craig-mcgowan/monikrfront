module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Paytone One", "sans-serif"],
    },
    extend: {
      keyframes: {
        rainbow: {
          "0%,100": { transform: "translate(0px,0px)" },
          "50%": { transform: "translate(0px, -5px)"},
        },
        
      },
      animation: {

        
      }
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
