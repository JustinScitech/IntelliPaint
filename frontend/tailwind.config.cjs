/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
            fontFamily: {
                inter: ['Inter var', 'sans-serif'],
            },
            boxShadow: {
                card: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cardhover: '0 4px 8px rgba(0, 0, 0, 0.2)',
                button: '0 2px 4px rgba(0, 0, 0, 0.2)',
                buttonhover: '0 4px 8px rgba(0, 0, 0, 0.4)',
            },
            colors: {
                primary: {
                    DEFAULT: '#4c51bf',
                    dark: '#434190',
                },
                secondary: {
                    DEFAULT: '#666e75',
                },
            },
        },
    },
    plugins: [],
};