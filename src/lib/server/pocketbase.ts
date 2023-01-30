import PocketBase from 'pocketbase'

import { POCKETBASE_URL } from '$lib/config'

/**
 * Setup PocketBase instance
 * @param {string} url - The URL of the PocketBase instance
 * @param {Request} request - The request object
 * @returns {PocketBase} - The PocketBase instance
 */
async function setupPocketbase(request: Request) {
	return await Promise.all([setupAdmin(), setupUser(request)])
}

async function setupAdmin() {
	const admin = new PocketBase(POCKETBASE_URL)

	try {
		await admin.admins?.authWithPassword('daniel@gaiduk.dev', 'fozvaW-1xyghi-qovkuv')
	} catch (_) {
		console.log('Admin login failed!')
	}

	return admin
}

async function setupUser(request: Request) {
	const user = new PocketBase(POCKETBASE_URL)
	const cookie = request.headers.get('cookie') || ''

	await user.authStore.loadFromCookie(cookie)

	if (user.authStore.isValid) {
		try {
			await user.collection('users').authRefresh()
		} catch (_) {
			user.authStore.clear()
		}
	}

	return user
}

export { setupPocketbase }
