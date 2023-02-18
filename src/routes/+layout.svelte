<script>
	import '../app.postcss'

	import { MetaTags } from 'svelte-meta-tags'

	import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '$lib/config'
	import { page } from '$app/stores'
	import { getAllLocalePaths } from '$lib/utils'
	import { translate } from '$lib/translations'

	$: paths = getAllLocalePaths($page.url)
	$: defaultTitle = $translate(DEFAULT_TITLE)
	$: defaultDescription = $translate(DEFAULT_DESCRIPTION)
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
	canonical={$page.url.href}
	openGraph={{
		url: $page.url.href,
		title: siteTitle,
		description,
		site_name: siteTitle,
		type: 'website'
	}}
	twitter={{
		handle: '@handle',
		site: '@site',
		cardType: 'summary',
		title: siteTitle,
		description
	}}
/>

<slot />
