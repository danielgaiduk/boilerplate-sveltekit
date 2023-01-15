<script>
	import '../app.postcss'

	import { page } from '$app/stores'
	import { getAllLocalePaths } from '$lib/utils'

	$: paths = getAllLocalePaths($page.url)
</script>

<svelte:head>
	{#each paths as { locale, isDefault, url }}
		<link rel="alternate" hreflang={isDefault ? 'x-default' : locale} href={url} />
	{/each}
</svelte:head>

<slot />
