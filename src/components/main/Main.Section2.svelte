<script>
	import { getContext } from "svelte";
	import MainFig3 from "./Main.Fig3.svelte";
	import { each } from "svelte/internal";

	// import DemoScrolly from "../demo/Demo.Scrolly.svelte";
	const copy = getContext("copy");
</script>

<div class="section">
	<!-- <h2>{copy.subheading2}</h2> -->
	{#each Object.values(copy.fig3.static1) as paragraph}
		<p>{@html paragraph}</p>
	{/each}
	<MainFig3 />
	{#each Object.values(copy.fig3.static2) as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</div>

<style>
	h2 {
		background: var(--color-gray-600); /* semi-transparent gray */
		border-radius: 40px;
		padding: 0.5rem;
		height: auto;
		text-align: center;
		margin-bottom: 3rem;
		top: 1.25em;
	}

	.spacer {
		height: 75vh;
	}
</style>
