const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')
const ascpectRatio = require('@tailwindcss/aspect-ratio')
const lineClamp = require('@tailwindcss/line-clamp')

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [forms, typography, ascpectRatio, lineClamp]
}

module.exports = config
