import { LOCALES } from '$lib/config'

import type { ParamMatcher } from '@sveltejs/kit'

const match: ParamMatcher = (params) => {
	const locale = params.split('/')[0] || ''
	return LOCALES.includes(locale)
}

export { match }
