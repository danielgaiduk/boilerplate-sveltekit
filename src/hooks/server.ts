import { setupPocketbase } from '$lib/server'
import { getURLFragments } from '$lib/utils'
import { DEFAULT_THEME, POCKETBASE_URL } from '$lib/config'

import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, request, url, cookies } = event

	const { locale, location, isValid } = getURLFragments(url, request)

	if (!isValid) {
		return new Response(null, {
			status: 302,
			headers: { Location: location }
		})
	}

	const pocketbase = await setupPocketbase(POCKETBASE_URL, request)

	locals.locale = locale
	locals.pocketbase = pocketbase

	const theme = cookies.get('theme') || DEFAULT_THEME

	const resolveOptions = {
		transformPageChunk: ({ html }: { html: string }) => {
			let _html = html
			_html = _html.replace('%lang%', locale)
			_html = _html.replace('%theme%', theme)
			return _html
		}
	}

	const response = await resolve(event, resolveOptions)

	response.headers.append('set-cookie', pocketbase.authStore.exportToCookie())

	return response
}
