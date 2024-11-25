<!--
  @component
  Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->

<!-- spin animation https://svelte.dev/repl/bdc788a7d5dd4f8685e50326fa11ea0e?version=3.59.2 -->
<script>
	import { getContext, onMount, tick, createEventDispatcher } from "svelte";

	import { fade, draw, scale } from "svelte/transition";

	const copy = getContext("copy");
	const dispatch = createEventDispatcher();

	const { data, xScale, yGet, xGet, height, width } = getContext("LayerCake");

	export let maxLength;

	export let rotateAngle;

	export let flowerIndex;

	let readyToDraw = false;

	let showData = false;

	function computeAngleSlice() {
		return Math.PI / maxLength; //data.length max;
	}

	onMount(async () => {
		await tick(); // 等待Svelte更新DOM
		readyToDraw = true; // 现在设置一个标志，允许路径动画开始
	});

	let longMoviesData = $data.filter((movie) => movie.runtimeMinutes >= 120);
	let shortMoviesData = $data.filter((movie) => movie.runtimeMinutes < 120);

	function calculateOffset(i, arrayLength) {
		const cursiveStrength = 10;
		const halfLength = arrayLength / 2;
		const distanceToMiddle = Math.abs(i - halfLength);
		return Math.max(
			0.1,
			cursiveStrength - cursiveStrength * (1 - distanceToMiddle / halfLength)
		);
	}

	function CalculateCenterOffset(data) {
		const currentLength = data.length;
		return Math.PI - currentLength * computeAngleSlice();
	}

	function calculateLongMoviesData(data) {
		const longMoviesCount = data.filter(
			(movie) => movie.runtimeMinutes >= 120
		).length;
		const shortMoviesCount = data.filter(
			(movie) => movie.runtimeMinutes < 120
		).length;
		const percentage = ((longMoviesCount / data.length) * 100).toFixed(1);
		return { count: longMoviesCount, countShort: shortMoviesCount, percentage };
	}

	const { count, percentage, countShort } = calculateLongMoviesData($data);

	function handleMouseOver() {
		showData = true;
		dispatch("mouseover");
	}

	function handleMouseOut() {
		dispatch("mouseout");
	}
</script>

{#if readyToDraw}
	{@const AngleSliceThisPart = computeAngleSlice()}
	<defs>
		<linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
			<stop offset="0%" style="stop-color:white; stop-opacity:0.9" />
			<stop offset="15%" style="stop-color:white; stop-opacity:0.2" />
			<stop offset="100%" style="stop-color:white; stop-opacity:0" />
		</linearGradient>
	</defs>

	<path
		d="M0,0Q{rotateAngle * -10},{500},0,1000"
		stroke="url(#fadeGradient)"
		stroke-width="4"
		fill="none"
	/>
	<g
		class="flower"
		transform=" rotate({rotateAngle})  translate(0, 10) "
		on:mouseover={handleMouseOver}
		on:focus={handleMouseOver}
		on:mouseout={handleMouseOut}
		on:blur={handleMouseOut}
	>
		<!-- <g stroke="#CCCCCC" stroke-width="1">
			<line x1="0" y1="0" x2="500" y2="0" />
			<line x1="0" y1="-50" x2="500" y2="-50" />
			<line x1="0" y1="-100" x2="500" y2="-100" />
			<line x1="0" y1="-150" x2="500" y2="-150" />
			<line x1="0" y1="-200" x2="500" y2="-200" />
			<line x1="0" y1="-250" x2="500" y2="-250" />
			<line x1="0" y1="-300" x2="500" y2="-300" />
			<line x1="0" y1="-350" x2="500" y2="-350" />
			<line x1="0" y1="-400" x2="500" y2="-400" />
		</g>

		<g stroke="#CCCCCC" stroke-width="1">
			<line x1="0" y1="0" x2="0" y2="-500" />
			<line x1="50" y1="0" x2="50" y2="-500" />
			<line x1="100" y1="0" x2="100" y2="-500" />
			<line x1="150" y1="0" x2="150" y2="-500" />
			<line x1="200" y1="0" x2="200" y2="-500" />
			<line x1="250" y1="0" x2="250" y2="-500" />
			<line x1="300" y1="0" x2="300" y2="-500" />
			<line x1="350" y1="0" x2="350" y2="-500" />
			<line x1="400" y1="0" x2="400" y2="-500" />
		</g> -->

		<!--  a path for each of the flowers, from the 0,0 to the x,y, with a curve -->

		{#each longMoviesData as d, i}
			{@const centerOffset = CalculateCenterOffset(longMoviesData)}

			{@const AngleSliceEachLine =
				AngleSliceThisPart * i + Math.PI + +centerOffset / 2}
			{@const x = $yGet(d) * Math.cos(AngleSliceEachLine)}
			{@const y = $yGet(d) * Math.sin(AngleSliceEachLine)}
			{@const offset = calculateOffset(i, longMoviesData.length)}

			<circle class="flowerPoints" cx={x} cy={y} r="0.8" fill="gold" />
			{#if x > 0}
				<path
					d="M0,0Q{x / 4 - offset},{y / 4 - offset},{x / 2},{y / 2}
						,Q{x * 0.75 + offset},{y * 0.75 + offset},{x},{y}"
					stroke="gold"
					stroke-width="0.6"
					fill="none"
					opacity="0.6"
				/>
			{/if}
			{#if x < 0}
				<path
					d="M0,0Q{x / 4 + offset},{y / 4 - offset},{x / 2},{y / 2}
						,Q{x * 0.75 - offset},{y * 0.75 + offset},{x},{y}"
					stroke="gold"
					stroke-width="0.6"
					fill="none"
					opacity="0.6"
				/>
			{/if}
			{#if x == 0}
				<line
					x1="0"
					y1="0"
					x2={x}
					y2={y}
					stroke={d.runtimeMinutes >= 120 ? "gold" : "grey"}
					stroke-width="0.6"
					opacity="0.6"
				/>
			{/if}
		{/each}

		{#each shortMoviesData as d, i}
			{@const centerOffset = CalculateCenterOffset(shortMoviesData)}
			{@const AngleSliceEachLine =
				AngleSliceThisPart * i + Math.PI + centerOffset / 2}
			{@const x = $yGet(d) * Math.cos(AngleSliceEachLine)}
			{@const y = $yGet(d) * Math.sin(AngleSliceEachLine)}
			{@const offset = calculateOffset(i, shortMoviesData.length)}

			<circle class="flowerPoints" cx={x} cy={y} r="0.8" fill="white" />
			{#if x > 0}
				<path
					d="M0,0Q{x / 4 - offset},{y / 4 - offset},{x / 2},{y / 2}
						,Q{x * 0.75 + offset},{y * 0.75 + offset},{x},{y}"
					stroke="white"
					stroke-width="0.6"
					fill="none"
					opacity="0.4"
				/>
			{/if}
			{#if x < 0}
				<path
					d="M0,0Q{x / 4 + offset},{y / 4 - offset},{x / 2},{y / 2}
						,Q{x * 0.75 - offset},{y * 0.75 + offset},{x},{y}"
					stroke="white"
					stroke-width="0.6"
					fill="none"
					opacity="0.4"
				/>
			{/if}
			{#if x == 0}
				<line
					x1="0"
					y1="0"
					x2={x}
					y2={y}
					stroke="white"
					stroke-width="0.6"
					opacity="0.4"
				/>
			{/if}
		{/each}
		{#if flowerIndex === 0}
			<text
				x="35"
				y="15"
				text-anchor="middle"
				font-size="1rem"
				fill="white"
				z-index="1000"
			>
				{$data[0].year} 年
			</text>
		{:else}
			<text
				x="30"
				y="15"
				text-anchor="middle"
				font-size="1rem"
				fill="white"
				z-index="1000"
			>
				{$data[0].year}
			</text>
		{/if}

		{#if flowerIndex === 0}
			<g>
				<text
					x="-65"
					y="15"
					text-anchor="middle"
					font-size="1rem"
					fill="gold"
					z-index="1000"
				>
					长电影数：{count}
				</text>
				<text
					x="-65"
					y="35"
					text-anchor="middle"
					font-size="15px"
					fill="white"
					z-index="1000"
				>
					短电影数：{countShort}
				</text>
				<text
					x="-75"
					y="55"
					text-anchor="middle"
					font-size="1rem"
					fill="gold"
					z-index="1000"
				>
					长电影占：{percentage}%
				</text>
			</g>
		{/if}
		{#if showData && flowerIndex !== 0}
			<g transition:fade={{ duration: 1000 }}>
				<text
					x="-25"
					y="15"
					text-anchor="middle"
					font-size="1rem"
					fill="gold"
					z-index="1000"
				>
					{count}
				</text>
				<text
					x="-25"
					y="35"
					text-anchor="middle"
					font-size="15px"
					fill="white"
					z-index="1000"
				>
					{countShort}
				</text>
				<text
					x="-35"
					y="55"
					text-anchor="middle"
					font-size="1rem"
					fill="gold"
					z-index="1000"
				>
					{percentage}%
				</text>
			</g>
		{/if}
	</g>
{/if}

<style>
	.viz3texts {
		position: absolute;
		font-size: 1rem;
	}
	.viz3text {
		visibility: hidden;
		opacity: 0;
	}

	.display {
		opacity: 1;
		visibility: visible;
		transition: opacity 1.3s ease-in-out;
	}
	.displaytext {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.6s ease-in-out;
	}

	.greyed {
		filter: contrast(0.3);
	}
	.highlighted {
		filter: contrast(1);
		fill-opacity: 0.8;
	}
	.flower:focus {
		outline: none;
	}
</style>
