<script>
	import '../app.postcss'

	import { MetaTags } from 'svelte-meta-tags'

	import { APP_TITLE, APP_DESCRIPTION } from '$lib/config'
	import { page } from '$app/stores'
	import { getAllLocalePaths } from '$lib/utils'
	import { translate } from '$lib/translations'

	$: paths = getAllLocalePaths($page.url)

	$: defaultTitle = $translate(APP_TITLE)
	$: defaultDescription = $translate(APP_DESCRIPTION)
	$: siteTitle = $translate($page.data?.seo?.title)
	$: siteDescription = $translate($page.data?.seo?.description)
	$: description = siteDescription || defaultDescription
</script>

<svelte:head>
	{#each paths as { locale, isDefault, url }}
		<link rel="alternate" hreflang={isDefault ? 'x-default' : locale} href={url} />
	{/each}
</svelte:head>

<MetaTags
	title={siteTitle}
	titleTemplate={`%s | ${defaultTitle}`}
	{description}
	canonical={$page.url.origin}
/>

<slot />
