import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return {
		seo: {
			title: 'homepage.title',
			description: 'homepage.description'
		}
	}
}
