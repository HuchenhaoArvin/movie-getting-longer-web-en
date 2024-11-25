<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	import MainViz1Animated from "$components/main/Main.Viz1Animated.svelte";
	// import MedianRuntimeData from "$data/median_runtime_by_year.csv";
	// import MedianRuntimeEachViewGroupData from "$data/median_runtime_by_group.csv";
	import MedianRuntimeData from "$data/median_runtime_by_group_with_total.csv";
	import { getContext } from "svelte";
	const copy = getContext("copy");
	// console.log("copy", copy);
	let value;
</script>

<section id="fig2scrolly">
	<!-- <h2>Scrolly <span>{value}</span></h2> -->
	<!-- need to rethink this part -->
	<!-- <div class="spacer" />
	<div class="spacer" />
	<div class="spacer" /> -->
	{#if value !== undefined}
		<section class="viz2">
			<MainViz1Animated {value} {MedianRuntimeData} />
		</section>
	{/if}
	<Scrolly bind:value>
		{#each [copy.fig1.scrolly1, copy.fig1.scrolly2, copy.fig2.scrolly1, copy.fig2.scrolly2] as section, i}
			{@const active = value === i}
			<div class="step" class:active>
				{#each Object.values(section) as paragraph}
					<p>{@html paragraph}</p>
				{/each}
			</div>
		{/each}
	</Scrolly>

	<div class="spacer" />
</section>

<style>
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 90vh;
	}

	.step {
		position: relative;
		border-radius: 20px;
		height: auto;
		text-align: left;
		padding: 20rem 1rem 20rem 1rem; /* 添加padding */
		margin-bottom: 30rem;
		pointer-events: none;
	}

	.step::before {
		content: "";
		position: absolute;
		top: 18rem; /* 视觉上的padding */
		left: 0; /* 视觉上的padding */
		right: 0; /* 视觉上的padding */
		bottom: 18rem; /* 视觉上的padding */
		/* background: var(--color-gray-600);  */
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		z-index: 1;
		/* opacity: 0.75; */
	}

	.step > * {
		position: relative;
		z-index: 2;
	}

	.viz2 {
		width: 100%;
		height: 50vh;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
