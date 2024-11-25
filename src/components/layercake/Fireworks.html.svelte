<!--
  @component
  Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->

<!-- spin animation https://svelte.dev/repl/bdc788a7d5dd4f8685e50326fa11ea0e?version=3.59.2 -->
<script>
	import { getContext, onMount, tick, createEventDispatcher } from "svelte";
	import { run } from "svelte/internal";
	import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
	import { symbolTriangle } from "d3";
	import { Circle } from "lucide-svelte";
	import { fade, draw, scale } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import inView from "$actions/inView";

	const copy = getContext("copy");
	const dispatch = createEventDispatcher();

	const { data, xScale } = getContext("LayerCake");
	//position of each of the 34 fireworks, goes like a snake
	export let positionEach = [
		// 第一部分
		{ x: -15, y: -15 },
		{ x: 15, y: 10 },
		{ x: -5, y: 50 },
		{ x: 18, y: 85 },
		{ x: -18, y: 105 },
		{ x: 6, y: 140 },
		{ x: -15, y: 185 },
		{ x: 18, y: 200 },
		{ x: 6, y: 220 },
		{ x: 6, y: 230 },
		{ x: 6, y: 240 },
		{ x: 6, y: 250 },
		{ x: 6, y: 260 },
		{ x: 6, y: 270 },
		{ x: 6, y: 280 },
		{ x: 6, y: 290 },
		{ x: 6, y: 300 },
		{ x: 6, y: 310 },
		{ x: 6, y: 320 },
		{ x: 6, y: 330 },
		{ x: 6, y: 340 },
		{ x: 6, y: 350 },
		{ x: 6, y: 360 },
		{ x: 6, y: 370 }
	];

	export let inViewRef;

	let readyToDraw = false;
	let hoveredIndex = null;
	let hoveredPedalIndex = null;

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

	let isVisible = [];
	let isVisibleText = [];

	let myDiv; // 创建一个变量来引用 div

	function handleEnterText(j) {
		isVisibleText[j] = true;
	}

	function handleExitText(j) {
		isVisibleText[j] = false;
	}

	function handleEnter(j) {
		isVisible[j] = true;
	}
	function handleExit(j) {
		isVisible[j] = false;
	}

	$: precalculatedValues = $data.map((series) => {
		const AngleSliceThisPart = computeAngleSlice(series);
		return LongPartShortPartReunion(series).map((d, i) => {
			const AngleSliceEachLine = AngleSliceThisPart * i - Math.PI / 2;
			const length = $xScale(d.runtimeMinutes) * 0.0006;

			return { AngleSliceEachLine, length };
		});
	});
</script>

<!-- should do it with transfrom and scale -->
{#if readyToDraw}
	<div class="viz3texts">
		<div
			style="width:25vw;transform:translate(25vw,-8vw)"
			use:inView
			on:enter={() => handleEnterText(0)}
			on:exit={() => handleExitText(0)}
		>
			<p class={`viz3text ${isVisibleText[0] ? "displaytext" : ""}`}>
				{@html copy.fig3.infig1.p1}
			</p>
		</div>
		<div
			class={`viz3text ${isVisibleText[1] ? "displaytext" : ""}`}
			style="width:10vw;transform:translate(0vw,23vw)"
			use:inView
			on:enter={() => handleEnterText(1)}
			on:exit={() => handleExitText(1)}
		>
			{@html copy.fig3.infig2.p1}
		</div>
		<div
			class={`viz3text ${isVisibleText[2] ? "displaytext" : ""}`}
			style="width:16vw;transform:translate(0vw,110vw)"
			use:inView
			on:enter={() => handleEnterText(2)}
			on:exit={() => handleExitText(2)}
		>
			{@html copy.fig3.infig3.p1}
		</div>
	</div>

	<div class="fireworks-group">
		{#each $data as series, j}
			{@const margin = 0}
			{@const rowNum = Math.floor(j / 2)}
			{@const colNum = j % 2}
			{@const xPosition = colNum * (1 + margin)}
			{@const yPosition = rowNum * (1 + margin)}
			{@const AngleSliceThisPart = computeAngleSlice(series)}
			{@const RoughSort = LongPartShortPartReunion(series)}
			{@const currentPosition = positionEach[j] || {
				x: xPosition,
				y: yPosition
			}}
			{@const longMovieCount = series.values.filter(
				(d) => d.runtimeMinutes >= 120
			).length}
			{@const radius = 90}
			{@const longMovieRatio = longMovieCount / series.values.length}
			{@const longMovieAngle = longMovieRatio * 360 - 86}

			{@const longMovieAngleRadians = longMovieAngle * (Math.PI / 180)}
			{@const longMoviePosition = {
				x: radius * Math.cos(longMovieAngleRadians),
				y: radius * Math.sin(longMovieAngleRadians)
			}}

			<div
				class="fireworks"
				style="transform: translate({currentPosition.x}vw, {currentPosition.y}vh);"
				use:inView={{ bottom: 100 }}
				on:enter={() => handleEnter(j)}
				on:exit={() => handleExit(j)}
				on:mouseover={() => {
					hoveredIndex = j;
				}}
				on:mouseout={() => {
					hoveredIndex = null;
				}}
				on:focus={() => {
					hoveredIndex = j;
				}}
				on:blur={() => {
					hoveredIndex = null;
				}}
			>
				<svg viewBox="-250 -250 500 500">
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

					<g class={`fireworkSvgGroup ${isVisible[j] ? "display" : ""}`}>
						<path
							id={`textPath-${j}`}
							d="M 5 -{radius} A {radius} {radius} 0 0 1 {longMoviePosition.x} {longMoviePosition.y}"
							fill="none"
							stroke="var(--color-star-yellow)"
							stroke-width="1"
							stroke-dasharray="1"
						/>

						<circle
							cx="5"
							cy="-{radius}"
							r="1.5"
							fill="var(--color-star-yellow)"
						/>

						<circle
							cx={longMoviePosition.x}
							cy={longMoviePosition.y}
							r="1.5"
							fill="var(--color-star-yellow)"
						/>

						<text
							font-size="8"
							text-anchor="middle"
							fill="var(--color-star-yellow)"
							stroke="var(--color-gray-100)"
							stroke-width="0.4"
							dy="-0.3em"
						>
							<textPath href={`#textPath-${j}`} startOffset="50%">
								{(longMovieRatio * 100).toFixed(1) + "%"}
							</textPath>
						</text>

						<text
							font-size="8"
							text-anchor="middle"
							fill="var(--color-star-yellow)"
							stroke="var(--color-gray-100)"
							stroke-width="0.4"
							dy="1em"
						>
							<textPath href={`#textPath-${j}`} startOffset="50%">
								{longMovieCount}
							</textPath>
						</text>

						<text
							text-anchor="middle"
							dominant-baseline="central"
							font-size="0.6em"
							fill="var(--color-gray-100)"
						>
							{series.year}
						</text>

						{#each precalculatedValues[j] as { AngleSliceEachLine, length }, i}
							<path
								d="M0,0 C0,0 66.89-96.23,82.16-205"
								stroke="none"
								filter="url(#watercolor-effect)"
								fill={RoughSort[i].runtimeMinutes >= 120
									? "url(#TealFlower)"
									: "url(#myGradient)"}
								fill-opacity="0.2"
								style="transform: rotate(calc({(AngleSliceEachLine * 180) /
									Math.PI +
									70}deg)) translate(0.7vw, -0.7vw) scale({length})"
								class:greyed={hoveredPedalIndex !== null &&
									hoveredPedalIndex !== i &&
									hoveredIndex === j}
								class:highlighted={hoveredPedalIndex === i &&
									hoveredIndex === j}
								on:mouseover={(e) => {
									dispatch("mouseover", {
										e,
										title: RoughSort[i].title,
										runtimeMinutes: RoughSort[i].runtimeMinutes
									});
									hoveredPedalIndex = i;
								}}
								on:mouseout={() => {
									hoveredPedalIndex = null;
									dispatch("mouseout");
								}}
								on:focus={(e) =>
									dispatch("mouseover", {
										e,
										title: RoughSort[i].title,
										runtimeMinutes: RoughSort[i].runtimeMinutes
									})}
								on:blur={() => dispatch("blur")}
							/>
						{/each}
					</g>
				</svg>
			</div>
		{/each}
	</div>
{/if}

<!-- d="M267.08,641.14c0,0,66.89-76.23,52.16-235" -->

<style>
	.fireworks-group {
		position: relative;
	}

	.fireworks {
		position: absolute;
		width: 40vw;
		height: 40vw;
	}
	.fireworkSvgGroup {
		visibility: hidden;
		opacity: 0;
		scale: 1.2;
		will-change: opacity;
	}
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
</style>
