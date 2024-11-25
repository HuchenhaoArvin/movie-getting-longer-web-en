<!--
  @component
  Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->

<!-- spin animation https://svelte.dev/repl/bdc788a7d5dd4f8685e50326fa11ea0e?version=3.59.2 -->
<script>
	import { getContext, onMount, tick } from "svelte";
	import { run } from "svelte/internal";
	import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
	import { symbolTriangle } from "d3";
	import { Circle } from "lucide-svelte";
	import { fade, draw } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import inView from "$actions/inView";

	const { data, xScale } = getContext("LayerCake");
	//position of each of the 34 fireworks, goes like a snake
	export let positionEach = [
		// 第一部分
		{ x: 0, y: 0 },
		{ x: 0, y: 30 },
		{ x: 0, y: 60 },
		{ x: 20, y: 0 },
		{ x: 20, y: 30 },
		{ x: 20, y: 60 },
		{ x: 40, y: 0 },
		{ x: 40, y: 30 },
		{ x: 40, y: 60 },
		{ x: 60, y: 0 },
		{ x: 60, y: 30 },
		{ x: 60, y: 60 },

		// 第二部分
		{ x: 100, y: 0 },
		{ x: 100, y: 30 },
		{ x: 100, y: 60 },
		{ x: 120, y: 0 },
		{ x: 120, y: 30 },
		{ x: 120, y: 60 },
		{ x: 140, y: 0 },
		{ x: 140, y: 30 },
		{ x: 140, y: 60 },
		{ x: 160, y: 0 },
		{ x: 160, y: 30 },
		{ x: 160, y: 60 },

		// 第三部分
		{ x: 210, y: 0 },
		{ x: 230, y: 0 },
		{ x: 250, y: 0 },
		{ x: 200, y: 30 },
		{ x: 220, y: 30 },
		{ x: 240, y: 30 },
		{ x: 260, y: 30 },
		{ x: 210, y: 60 },
		{ x: 230, y: 60 },
		{ x: 250, y: 60 }
	];

	export let inViewRef;

	let readyToDraw = false;

	$: computeAngleSlice = (series) => {
		return (Math.PI * 2) / series.values.length;
	};

	// for the RoughSort of the data. Let long movies render first without sorting the dataset.
	$: LongPartShortPartReunion = (series) => {
		const LongPart = series.values.filter((d) => d.runtimeMinutes >= 120);
		const ShortPart = series.values.filter((d) => d.runtimeMinutes < 120);
		return [...LongPart, ...ShortPart];
	};

	onMount(async () => {
		await tick(); // 等待Svelte更新DOM
		readyToDraw = true; // 现在设置一个标志，允许路径动画开始
	});
</script>

<defs>
	<linearGradient id="myGradient" gradientTransform="rotate(0)">
		<stop offset="20%" stop-color="var(--color-gray-100)" />
		<stop offset="80%" stop-color="var(--color-gray-400)" />
	</linearGradient>

	<linearGradient id="TealFlower" gradientTransform="rotate(0)">
		<stop offset="20%" stop-color="var(--color-gray-100)" />
		<stop offset="80%" stop-color="var(--color-star-yellow)" />
	</linearGradient>
</defs>

<!-- should do it with transfrom and scale -->
{#if readyToDraw}
	<g class="fireworks-group">
		{#each $data as series, j}
			{@const margin = 5}
			{@const rowNum = Math.floor(j / 2)}
			{@const colNum = j % 2}
			{@const xPosition = colNum * (35 + margin)}
			{@const yPosition = rowNum * (80 + margin)}
			{@const AngleSliceThisPart = computeAngleSlice(series)}
			{@const RoughSort = LongPartShortPartReunion(series)}
			{@const currentPosition = { x: xPosition, y: yPosition }}

			<g
				class="fireworks"
				style="transform: translate({currentPosition.x}vw, {currentPosition.y}vh);"
				use:inView={{ once: true }}
				in:fade={{ duration: 1000, delay: 100 }}
			>
				{#each RoughSort as d, i}
					{@const AngleSliceEachLine = AngleSliceThisPart * i - Math.PI / 2}

					{@const length = $xScale(d.runtimeMinutes) * 0.0015}
					<!-- {@const radius = 30} -->

					<path
						d="M0,0 C0,0 66.89-96.23,82.16-205"
						stroke="none"
						fill={d.runtimeMinutes >= 120
							? "url(#TealFlower)"
							: "url(#myGradient)"}
						fill-opacity="0.25"
						style="transform: rotate(calc({(AngleSliceEachLine * 180) /
							Math.PI +
							70}deg)) translate(0.8vw, -1.3vw) scale({length})"
					/>
				{/each}
			</g>
		{/each}
	</g>
{/if}
<!-- d="M267.08,641.14c0,0,66.89-76.23,52.16-235" -->
