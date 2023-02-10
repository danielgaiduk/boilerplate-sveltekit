import PocketBase from 'pocketbase'

import {
	SECRET_POCKETBASE_URL,
	SECRET_POCKETBASE_ADMIN_EMAIL,
	SECRET_POCKETBASE_ADMIN_PASSWORD
} from '$env/static/private'

/**
 * Setup PocketBase instance
 * @param {string} url - The URL of the PocketBase instance
 * @param {Request} request - The request object
 * @returns {PocketBase} - The PocketBase instance
 */
async function setupPocketbase(request: Request): Promise<PocketBase[]> {
	return await Promise.all([setupAdmin(), setupUser(request)])
}

/**
 * Setup PocketBase admin instance
 * @returns {PocketBase} - The PocketBase admin instance
 */
async function setupAdmin(): Promise<PocketBase> {
	const admin = new PocketBase(SECRET_POCKETBASE_URL)

	try {
		await admin.admins?.authWithPassword(
			SECRET_POCKETBASE_ADMIN_EMAIL,
			SECRET_POCKETBASE_ADMIN_PASSWORD
		)
	} catch (_) {
		console.log('Admin login failed!')
	}

	return admin
}

/**
 * Setup PocketBase user instance
 * @param {Request} request - The request object
 * @returns {PocketBase} - The PocketBase user instance
 */
async function setupUser(request: Request): Promise<PocketBase> {
	const user = new PocketBase(SECRET_POCKETBASE_URL)

	await user.authStore.loadFromCookie(request.headers.get('cookie') || '')

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
