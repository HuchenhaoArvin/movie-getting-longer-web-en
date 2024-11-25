<script>
	import { getContext } from "svelte";

	import MainFig1Animated from "./Main.Fig1Animated.svelte";

	// import DemoScrolly from "../demo/Demo.Scrolly.svelte";
	const copy = getContext("copy");
</script>

<div class="section">
	<!-- <h2>{copy.subheading1}</h2> -->
	<!-- <MainFig1 />
	<MainFig2 /> -->

	<MainFig1Animated />
	{#each Object.values(copy.fig2.static1) as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</div>

<style>
	h2 {
		position: sticky;
		top: 1.25em;
		background: var(--color-gray-600); /* semi-transparent gray */
		border-radius: 40px;
		padding: 0.5rem;
		height: auto;
		text-align: center;
	}
</style>
