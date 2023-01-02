const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

/** @type {import('postcss').Config} */
const config = {
	plugins: [tailwindcss(), autoprefixer]
}

module.exports = config
