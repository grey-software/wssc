/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
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
