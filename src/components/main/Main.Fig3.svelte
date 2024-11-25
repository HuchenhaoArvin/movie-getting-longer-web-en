<script>
	import MainViz3 from "$components/main/Main.Viz3.svelte";

	import Top10MoviesAfter1990Data from "$data/top_10_percent_movies_length.csv";
	import { getContext } from "svelte";

	const copy = getContext("copy");
	// console.log("copy", copy);
	let value;
	let transformedData = {};
	let id = 0;

	Top10MoviesAfter1990Data.forEach(
		({ startYear, runtimeMinutes, primaryTitle }) => {
			if (!transformedData[startYear]) {
				transformedData[startYear] = {
					year: +startYear,
					values: []
				};
			}

			transformedData[startYear].values.push({
				title: primaryTitle,
				runtimeMinutes: +runtimeMinutes,
				year: +startYear,
				id: id++
			});
		}
	);
	let data = Object.values(transformedData);
</script>

<section id="fig3">
	<!-- <h2>Scrolly <span>{value}</span></h2> -->
	<!-- need to rethink this part -->

	<section class="viz3">
		<MainViz3 {data} />
	</section>
	<!-- <div>
		{#each Object.values(copy.fig3.infig1) as paragraph}
			<p>{paragraph}</p>
		{/each}
		{#each Object.values(copy.fig3.infig2) as paragraph}
			<p>{paragraph}</p>
		{/each}
		{#each Object.values(copy.fig3.infig3) as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div> -->

	<!-- <Scrolly bind:value>
		{#each [copy.fig3.scrolly1, copy.fig3.scrolly2, copy.fig3.scrolly3] as section, i}
			{@const active = value === i}
			<div class="step" class:active>
				{#each Object.values(section) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		{/each}
	</Scrolly> -->
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
		background: var(--color-gray-600); /* semi-transparent gray */
		border-radius: 20px;
		z-index: 1;
		opacity: 0.75;
	}

	.step > * {
		position: relative;
		z-index: 2;
	}

	.viz3 {
		width: 100%;
	}
	#fig3 {
		margin-top: 10rem;
		padding-top: 160px;
	}
	/* 
	.viz3visible {
		width: 100%;
	
		position: fixed;
		top: 0;
		left: 0;
		z-index: -100;
		opacity: 1;
		transition: opacity 0.5s ease-in-out; 
		will-change: transform, opacity;
	} */
</style>
