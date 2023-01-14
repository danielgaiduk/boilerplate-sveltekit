import type { LayoutServerLoad } from './$types'

const load: LayoutServerLoad = async ({ locals }) => {
	return { locale: locals.locale, user: locals.user }
}

export { load }
