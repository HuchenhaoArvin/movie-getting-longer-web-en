<script>
	import { getContext } from "svelte";
	import MainFig4 from "./Main.Fig4.svelte";

	// import DemoScrolly from "../demo/Demo.Scrolly.svelte";
	const copy = getContext("copy");
</script>

<div class="section">
	<!-- <h2>{copy.subheading3}</h2> -->
	{#each Object.values(copy.fig4.static1) as paragraph}
		<p>{paragraph}</p>
	{/each}
	<div class="spacer" />
	<MainFig4 />
	{#each Object.values(copy.fig4.static2) as paragraph}
		<p>{paragraph}</p>
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
		margin-top: 3rem;
	}
	.spacer {
		height: 25vh;
	}
</style>
