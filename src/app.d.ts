declare namespace App {
	// interface Error {}
	interface Locals {
		locale: string
		pocketbase: import('pocketbase').PocketBase
		user: import('pocketbase').BaseAuthStore.Model
	}
	// interface PageData {}
	// interface Platform {}
}
