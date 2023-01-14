import PocketBase from 'pocketbase'
import { isAvailableLocale, getPreferredLocale, serializeNonPOJOs } from '$lib/utils'
import { PATH_EXCEPTIONS, DEFAULT_THEME, POCKETBASE_URL } from '$lib/config'

import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, request, url, cookies } = event
	const [locale, ...params] = url.pathname?.substring(1)?.split('/') || []
	const theme = cookies.get('theme') || DEFAULT_THEME

	const isProbablyLocale = locale && locale.length === 2
	const isValidLocale = locale && isAvailableLocale(locale)
	const isException = PATH_EXCEPTIONS.includes(locale)

	if (!isException && !isValidLocale) {
		const preferredLocale = getPreferredLocale(request)
		const locationFragment = `${!isProbablyLocale ? `${locale}/` : ''}`
		const locationParams = `${params.join('/')}`
		const location = `/${preferredLocale}/${locationFragment}${locationParams}`

		return new Response(null, {
			status: 302,
			headers: { Location: location }
		})
	}

	const pocketbase = new PocketBase(POCKETBASE_URL)
	pocketbase.authStore.loadFromCookie(request.headers.get('cookie') || '')

	try {
		if (pocketbase.authStore.isValid) {
			await pocketbase.collection('users').authRefresh()
		}
	} catch (_) {
		pocketbase.authStore.clear()
	}

	locals.locale = locale
	locals.pocketbase = pocketbase
	locals.user = serializeNonPOJOs(pocketbase.authStore.model)

	const resolveOptions = {
		transformPageChunk: ({ html }: { html: string }) => {
			let _html = ''
			_html = html.replace('%lang%', locale)
			_html = html.replace('%theme%', theme)
			return _html
		}
	}

	const response = await resolve(event, resolveOptions)

	response.headers.append('set-cookie', pocketbase.authStore.exportToCookie())

	return response
}
