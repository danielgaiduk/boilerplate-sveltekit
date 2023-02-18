import * as Sentry from '@sentry/svelte'
import crypto from 'crypto'

import { PUBLIC_SENTRY_DSN } from '$env/static/public'

import type { HandleClientError } from '@sveltejs/kit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0
})

const handleError = (({ error, event }) => {
	const id = crypto.randomUUID()

	Sentry.captureException(error, { extra: { event, id } })

	return {
		id,
		message: 'Internal Server Error!'
	}
}) satisfies HandleClientError

export { handleError }
