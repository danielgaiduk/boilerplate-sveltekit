import { LOCALES, DEFAULT_LOCALE } from '$lib/config'

/**
 * Parses the Accept-Language header and returns the language code
 * @param {string} [headerLanguage] - The language header from the request
 * @returns {string} - The language code
 */
function parseAcceptLanguage(headerLanguage: string | null): string | null {
	if (!headerLanguage) return null

	const filteredLanguages = []
	const acceptedLanguages = headerLanguage?.split(',') || []

	for (const acceptedLanguage of acceptedLanguages) {
		const [fullLanguage, rating = '1'] = acceptedLanguage.split(';q=')
		const [language] = fullLanguage.split('-')
		if (language && rating) {
			filteredLanguages.push({ language, rating: parseFloat(rating) })
		}
	}

	const sortedLanguages = filteredLanguages.sort((a, b) => b?.rating - a?.rating) || []

	return sortedLanguages?.[0]?.language
}

/**
 * Checks if a locale is available
 * @param {string} locale - The locale to check
 * @returns {boolean} - Whether the locale is available
 */
function isAvailableLocale(locale: string | null): boolean {
	if (!locale) return false

	const lowerCaseLocale = locale.toLowerCase()

	return LOCALES.includes(lowerCaseLocale)
}

/**
 * Gets the preferred locale from the request
 * @param {Request} request - The request object
 * @returns {string} - The preferred locale
 */
function getPreferredLocale(request: Request): string {
	const acceptLanguage = request.headers.get('Accept-Language')
	const preferredLocale = parseAcceptLanguage(acceptLanguage)
	const isPrefferedLocaleAvailable = !!preferredLocale && isAvailableLocale(preferredLocale)

	return isPrefferedLocaleAvailable ? preferredLocale : DEFAULT_LOCALE
}

export { parseAcceptLanguage, isAvailableLocale, getPreferredLocale }
