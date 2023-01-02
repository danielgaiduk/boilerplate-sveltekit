import { expect, test } from '@playwright/test'

test('index page has expected text', async ({ page }) => {
	await page.goto('/')
	expect(await page.textContent('p')).toBe('Boilerplate')
})
