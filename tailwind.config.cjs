const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')
const ascpectRatio = require('@tailwindcss/aspect-ratio')
const lineClamp = require('@tailwindcss/line-clamp')
const daisyui = require('daisyui')

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			inter: ['Inter var']
		}
	},
	plugins: [forms, typography, ascpectRatio, lineClamp, daisyui],
	daisyui: {
		themes: ['light', 'dark']
	}
}

module.exports = config
