import { dev } from '$app/environment'

const DEFAULT_LOCALE = 'en'
const DEFAULT_THEME = 'light-theme'
const POCKETBASE_URL = dev ? 'http://localhost:8090' : 'http://localhost:8090'

export { DEFAULT_LOCALE, DEFAULT_THEME, POCKETBASE_URL }
