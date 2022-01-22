module.exports = {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
