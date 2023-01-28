import type { LayoutServerLoad } from './$types'

const load: LayoutServerLoad = async ({ locals }) => {
	return { locale: locals.locale }
}

export { load }
