import * as Sentry from '@sentry/node'
import crypto from 'crypto'

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
	const { locale, location, isValid } = getURLFragments(url, request)

	if (!isValid) {
		return new Response(null, {
			status: 302,
			headers: { Location: location }
		})
	}

	locals.locale = locale

	const resolveOptions = {
		transformPageChunk: ({ html }: { html: string }): string => {
			const theme = cookies.get('theme') || DEFAULT_THEME
			return Object.entries({
				'%lang%': locale,
				'%theme%': theme ? `data-theme="${theme}"` : ''
			}).reduce((prev, [key, value]) => {
				return prev.replace(key, value)
			}, html)
		}
	}

	return await resolve(event, resolveOptions)
}) satisfies Handle

const handleError = (({ error, event }) => {
	const id = crypto.randomUUID()

	Sentry.captureException(error, { extra: { event, id } })

	return {
		id,
		message: 'Internal Server Error!'
	}
}) satisfies HandleServerError

export { handle, handleError }
