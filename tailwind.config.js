/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                merriweather: ["Merriweather", "serif"],
            },
            colors: {
                primary: "#C7002B",
                secondary: "#020E35",
                pink: "#FFEEF6",
                accent: "#717171",
                primaryAccent: "#fcf2f3"
            },
        },
    },
    plugins: [],
};
