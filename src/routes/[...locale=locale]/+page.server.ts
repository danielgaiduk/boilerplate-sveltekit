import type { PageServerLoad } from './$types'

const load = (async () => {
	return {
		seo: {
			title: 'homepage.title',
			description: 'homepage.description'
		}
	}
}) satisfies PageServerLoad

export { load }
