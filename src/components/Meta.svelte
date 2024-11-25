<script>
	export let title = "Movies are getting longer";
	export let description =
		"A data-driven analysis of movie runtimes over the years.";
	export let url = "";
	export let keywords = "";
	export let preloadFont = [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="" />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}/" />
	<link rel="icon" href="./favicon.png" type="image/png" />
	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each}
</svelte:head>
