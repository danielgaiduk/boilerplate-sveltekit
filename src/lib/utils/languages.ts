import { LOCALES, DEFAULT_LOCALE, PATH_EXCEPTIONS } from '$lib/config'

import type { IUrlFragments, IUrlCollection } from '$lib/models'

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

/**
 * Gets the locale and the path from the URL
 * @param {URL} url - The URL object
 * @returns {[string, string]} - The locale and the path
 */
function seperateLocaleFromPath(url: URL): [string, string] {
	const [locale, ...rest] = url.pathname?.substring(1)?.split('/') || []

	return [locale, rest.join('/')]
}

/**
 * Gets the fragments of the URL
 * @param {URL} url - The URL object
 * @param {Request} request - The request object
 * @returns {IUrlFragments} - The fragments of the URL
 */
function getURLFragments(url: URL, request: Request): IUrlFragments {
	const [locale, rest] = seperateLocaleFromPath(url)

	const isValidLocale = locale && isAvailableLocale(locale)
	const isProbablyLocale = locale && !isValidLocale && locale.length === 2
	const isException = locale && PATH_EXCEPTIONS.includes(locale)

	const fragments = {
		locale,
		location: url.pathname,
		isValid: true
	}

	if (!isException && !isValidLocale) {
		const preferredLocale = getPreferredLocale(request)
		const locationFragment = `${!isProbablyLocale ? `${locale}/` : ''}`
		const location = `/${preferredLocale}/${locationFragment}${rest}`

		fragments.locale = preferredLocale
		fragments.location = location
		fragments.isValid = false
	}

	return fragments
}

/**
 * Gets all the locale paths
 * @param {URL} url - The URL object
 * @returns {IUrlCollection[]} - The locale paths
 */
function getAllLocalePaths(url: URL): IUrlCollection[] {
	const [, rest] = seperateLocaleFromPath(url)

	const allURLs: IUrlCollection[] = []

	for (const locale of LOCALES) {
		const newUrl = new URL(url.toString())
		const restPath = rest?.length > 0 ? `/${rest}` : ''

		newUrl.pathname = `/${locale}${restPath}`

		allURLs.push({
			locale,
			isDefault: locale === DEFAULT_LOCALE,
			url: newUrl.toString()
		})
	}

	return allURLs
}

export {
	parseAcceptLanguage,
	isAvailableLocale,
	getPreferredLocale,
	getURLFragments,
	seperateLocaleFromPath,
	getAllLocalePaths
}
