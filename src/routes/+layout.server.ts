import type { LayoutServerLoad } from './$types'

const load = (async ({ locals: { locale } }) => {
	return { locale }
}) satisfies LayoutServerLoad

export { load }
