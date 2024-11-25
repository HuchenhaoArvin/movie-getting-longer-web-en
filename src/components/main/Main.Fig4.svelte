<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import RatingTrendData from "$data/rating_trend.csv";
	import GrossTrendData from "$data/gross_trend.csv";
	import { getContext } from "svelte";
	import MainViz4 from "$components/main/Main.Viz4.svelte";
	import { tweened } from "svelte/motion"; // import { format, precisionFixed } from "d3-format";
	import { cubicOut } from "svelte/easing";
	const copy = getContext("copy");
	// console.log("copy", copy);
	let value;
	let transformedRatingData = RatingTrendData.map((item) => [
		{
			averageRating: parseFloat(item.averageRating_long),
			form: "Long",
			startYear: parseInt(item.startYear)
		},
		{
			averageRating: parseFloat(item.averageRating_other),
			form: "Other",
			startYear: parseInt(item.startYear)
		}
	]).flat(); // Use flat() to flatten the array of arrays into a single array

	let transformedGrossData = GrossTrendData.map((item) => [
		{
			MedianWorldwideGross: parseFloat(item.WorldwideGross_long),
			form: "Long",
			startYear: parseInt(item.startYear, 10)
		},
		{
			MedianWorldwideGross: parseFloat(item.WorldwideGross_other),
			form: "Other",
			startYear: parseInt(item.startYear, 10)
		}
	]).flat(); // Use flat() to flatten the array of arrays into a single array

	// const offset = tweened(0, {
	// 	duration: 1200,
	// 	delay: 800,
	// 	easing: cubicOut
	// });
	// $: if (value === 3) {
	// 	$offset = -100;
	// } else if (value === 1 || value === 2) {
	// 	$offset = 0;
	// }

	// $: if (value === 0 || value === 1) {
	// 	$offset = 0;
	// } else if (value === 2) {
	// 	$offset = 50;
	// }
</script>

<section id="fig4scrolly">
	<!-- <h2>Scrolly <span>{value}</span></h2> -->
	<!-- need to rethink this part -->
	<div class="spacer" />
	{#if value !== undefined}
		<section class="viz4">
			<MainViz4 {value} {transformedRatingData} {transformedGrossData} />
		</section>
	{/if}
	<Scrolly bind:value>
		{#each [copy.fig4.scrolly1, copy.fig4.scrolly2, copy.fig4.scrolly3, copy.fig4.scrolly4] as section, i}
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
		height: 75vh;
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
		border-radius: 20px;
		z-index: 1;
		/* background-color: rgba(var(--color-gray-600), 0.4); */
		/* background-color: rgba(109, 109, 109, 0.5); */

		-webkit-backdrop-filter: blur(10px);

		backdrop-filter: blur(10px);
	}

	.step > * {
		position: relative;
		z-index: 2;
	}

	.viz4 {
		width: 100%;
		height: 50vh;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
