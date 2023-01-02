import i18n from 'sveltekit-i18n'

import type { Config } from 'sveltekit-i18n'

const config: Config = {
	loaders: [
		{
			locale: 'de',
			key: 'common',
			loader: async () => (await import('./de/common.json')).default
		},
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		}
	]
}

export const { t: translate, locale, locales, loading, loadTranslations } = new i18n(config)
