/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarycolor: {
          300: "#CCF5E9",
          500: "#7AE7C7",
        },
        secondarycolor: {
          400: "#182F35",
          500: "#112429",
        },
      },
    },
  },
  plugins: [],
};
