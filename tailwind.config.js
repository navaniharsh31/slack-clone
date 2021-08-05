module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        slack: {
          DEFAULT: "#4A154B",
          dark: "#330e34",
        },
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
