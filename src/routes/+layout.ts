import { loadTranslations } from '$lib/translations'

import type { LayoutLoad } from './$types'

const load: LayoutLoad = async ({ data }) => {
	await loadTranslations(data.locale)

	return {}
}

export { load }
