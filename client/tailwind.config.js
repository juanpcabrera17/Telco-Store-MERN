/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: { inter: ['inter', 'serif'] },
			/* animation: {
				'slow-blur': '1s cubic-bezier(.26,.54,.32,1) forwards lazy-fadeIn',
			}, */
		},
		/* 		flex: {
			2: '2 2 0%',
		}, */
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
};
