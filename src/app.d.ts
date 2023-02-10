type PocketBase = import('pocketbase')

declare namespace App {
	interface Error {
		id: string
		message: string
	}
	interface Locals {
		locale: string
		admin: PocketBase
		user: PocketBase
	}
	// interface PageData {}
	// interface Platform {}
}
