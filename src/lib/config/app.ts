import { dev } from '$app/environment'

const APP_TITLE = 'common.app.name'
const APP_DESCRIPTION = 'common.app.description'
const DEFAULT_LOCALE = 'de'
const DEFAULT_THEME = 'default-theme'
const POCKETBASE_URL = dev ? 'http://127.0.0.1:8090' : 'http://127.0.0.1:8090'

export { APP_TITLE, APP_DESCRIPTION, DEFAULT_LOCALE, DEFAULT_THEME, POCKETBASE_URL }
