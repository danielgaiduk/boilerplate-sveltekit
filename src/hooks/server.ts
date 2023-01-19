import { setupPocketbase } from '$lib/server'
import { getURLFragments, serializeNonPOJOs } from '$lib/utils'
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
	locals.user = serializeNonPOJOs(pocketbase.authStore.model)

	const theme = cookies.get('theme') || DEFAULT_THEME

	const REPLACE_HTML_SNIPPETS = {
		'%lang%': locale,
		'%theme%': theme
	}

	const resolveOptions = {
		transformPageChunk: ({ html }: { html: string }) => {
			return Object.entries(REPLACE_HTML_SNIPPETS).reduce((prev, [key, value]) => {
				return prev.replace(key, value)
			}, html)
		}
	}

	const response = await resolve(event, resolveOptions)

	response.headers.append('set-cookie', pocketbase.authStore.exportToCookie())

	return response
}
