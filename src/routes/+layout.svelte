<script>
	import '../app.postcss'

	import { MetaTags } from 'svelte-meta-tags'

	import { page } from '$app/stores'
	import { translate } from '$lib/translations'
	import { getAllLocalePaths } from '$lib/utils'
	import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '$lib/config'

	$: ({ data, url } = $page)
	$: paths = getAllLocalePaths(url)
	$: title = `${$translate(data?.seo?.title)} | ${$translate(DEFAULT_TITLE)}`
	$: description = $translate(data?.seo?.description || DEFAULT_DESCRIPTION)
</script>

<svelte:head>
	{#each paths as { locale, isDefault, url }}
		<link rel="alternate" hreflang={isDefault ? 'x-default' : locale} href={url} />
	{/each}
</svelte:head>

<MetaTags
	{title}
	{description}
	canonical={url.href}
	openGraph={{
		title,
		description,
		url: url.href,
		type: 'website',
		site_name: title
	}}
/>

<slot />
