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
        primaryColor: {
          100: "#F1FFF0",
          300: "#B8F2B5",
          500: "#46A941",
        },
        headingColor: {
          400: "#182F35",
          500: "#112429",
        },
        DeleteButton: {
          100: "#ECECEC",
          300: "#FF0000",
        },
        initiatedColor: "#FBB64F",
        inprogessColor: "#00A6FF",
        completedColor: "#6AD616",
        feedbackColor: "#1A5980",
        closedColor: "#D43434",
      },
    },
  },
  plugins: [],
};
