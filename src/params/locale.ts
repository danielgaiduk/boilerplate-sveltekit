import { LOCALES } from '$lib/config'

import type { ParamMatcher } from '@sveltejs/kit'

const match = ((params) => {
	const locale = params.split('/')[0] || ''

	return LOCALES.includes(locale)
}) satisfies ParamMatcher

export { match }
