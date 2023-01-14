import { LOCALES } from '$lib/config'

import type { ParamMatcher } from '@sveltejs/kit'

const match: ParamMatcher = (param) => {
	const locale = param.split('/')[0] || ''
	return LOCALES.includes(locale)
}

export { match }
