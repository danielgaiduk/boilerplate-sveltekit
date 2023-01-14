type PocketBase = import('pocketbase')

declare namespace App {
	// interface Error {}
	interface Locals {
		locale: string
		pocketbase: PocketBase.PocketBase
		user: PocketBase.BaseAuthStore.Model
	}
	// interface PageData {}
	// interface Platform {}
}
