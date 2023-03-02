import * as Sentry from '@sentry/node'

import { getURLFragments } from '$lib/utils'
import { DEFAULT_THEME } from '$lib/config'

import { PUBLIC_SENTRY_DSN } from '$env/static/public'

import type { Handle, HandleServerError } from '@sveltejs/kit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0
})

const handle = (async ({ event, resolve }) => {
	const { locals, request, url, cookies } = event
	const { locale, location, error } = getURLFragments(url, request)

	if (error) {
		return new Response(null, {
			status: 302,
			headers: { Location: location }
		})
	}

	locals.locale = locale

	const options = {
		transformPageChunk: ({ html }: { html: string }): string => {
			const sourceTheme = cookies.get('theme') || DEFAULT_THEME
			const theme = sourceTheme ? `data-theme="${sourceTheme}"` : ''

			const replacements = [
				{ target: '%lang%', value: locale },
				{ target: '%theme%', value: theme }
			]

			for (const { target, value } of replacements) {
				html = html.replace(target, value)
			}

			return html
		}
	}

	return await resolve(event, options)
}) satisfies Handle

const handleError = (({ error, event }) => {
	Sentry.captureException(error, { extra: { event } })

	return {
		message: 'Internal Server Error!'
	}
}) satisfies HandleServerError

export { handle, handleError }
