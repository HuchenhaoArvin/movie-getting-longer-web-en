<script>
	import { getContext } from "svelte";
	import MainFig5 from "./Main.Fig5.svelte";

	// import DemoScrolly from "../demo/Demo.Scrolly.svelte";
	const copy = getContext("copy");
</script>

<div class="section">
	<!-- <h2>{copy.subheading4}</h2> -->
	{#each Object.values(copy.fig5.static1) as paragraph}
		<p>{@html paragraph}</p>
	{/each}
	<MainFig5 />
	{#each Object.values(copy.fig5.static2) as paragraph}
		<p>{@html paragraph}</p>
	{/each}
	<div class="spacer" />
</div>

<style>
	h2 {
		background: var(--color-gray-600); /* semi-transparent gray */
		border-radius: 40px;
		padding: 0.5rem;
		height: auto;
		text-align: center;
		margin-bottom: 3rem;
		margin-top: 3rem;
	}
	.spacer {
		height: 75vh;
	}
</style>
