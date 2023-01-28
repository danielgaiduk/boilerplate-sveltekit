type PocketBase = import('pocketbase')

declare namespace App {
	// interface Error {}
	interface Locals {
		locale: string
		admin: PocketBase
		user: PocketBase
	}
	// interface PageData {}
	// interface Platform {}
}
