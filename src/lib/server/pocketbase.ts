import PocketBase from 'pocketbase'

/**
 * Setup PocketBase instance
 * @param {string} url - The URL of the PocketBase instance
 * @param {Request} request - The request object
 * @returns {PocketBase} - The PocketBase instance
 */
async function setupPocketbase(url: string, request: Request) {
	const admin = new PocketBase(url)
	const user = new PocketBase(url)

	await Promise.all([
		admin.admins.authWithPassword('', ''),
		user.authStore.loadFromCookie(request.headers.get('cookie') || '')
	])

	if (user.authStore.isValid) {
		await user.collection('users').authRefresh()
	} else {
		user.authStore.clear()
	}

	return { admin, user }
}

export { setupPocketbase }
