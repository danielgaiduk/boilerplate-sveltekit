import PocketBase from 'pocketbase'

/**
 * Setup PocketBase instance
 * @param {string} url - The URL of the PocketBase instance
 * @param {Request} request - The request object
 * @returns {PocketBase} - The PocketBase instance
 */
async function setupPocketbase(url: string, request: Request) {
	const pocketbase = new PocketBase(url)
	pocketbase.authStore.loadFromCookie(request.headers.get('cookie') || '')

	try {
		if (pocketbase.authStore.isValid) {
			await pocketbase.collection('users').authRefresh()
		}
	} catch (_) {
		pocketbase.authStore.clear()
	}

	return pocketbase
}

export { setupPocketbase }
