import * as Sentry from '@sentry/svelte'

import { PUBLIC_SENTRY_DSN } from '$env/static/public'

import type { HandleClientError } from '@sveltejs/kit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0
})

const handleError = (({ error, event }) => {
	Sentry.captureException(error, { extra: { event } })

	return {
		message: 'Internal Server Error!'
	}
}) satisfies HandleClientError

export { handleError }
