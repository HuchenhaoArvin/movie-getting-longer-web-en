<script>
	import { LayerCake, Svg, Html, flatten } from "layercake";

	import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";

	import Fireworks from "../layercake/Fireworks.svelte";
	import FireworksHtml from "../layercake/Fireworks.html.svelte";
	import inView from "$actions/inView";
	import Annotation from "../layercake/Annotation.html.svelte";
	import Tooltip from "../layercake/Tooltip.html.svelte";
	import TooltipforFireworks from "../layercake/TooltipforFireworks.html.svelte";
	import { fade } from "svelte/transition";
	import FlowerTree from "../layercake/FlowerTree.svelte";
	import { getContext } from "svelte";
	import SharedTooltip from "../layercake/SharedTooltip.html.svelte";

	export let data;
	const copy = getContext("copy");

	let inViewRef;
	let evt;
	let hideTooltip = new Array(data.length).fill(true);

	const positionEach = [
		{ x: 250, y: 10, deg: -10 },
		{ x: 650, y: 0, deg: 15 },
		{ x: 75, y: 300, deg: 5 },
		{ x: 450, y: 310, deg: 8 },
		{ x: 800, y: 450, deg: -25 },
		{ x: -30, y: 470, deg: -35 },
		{ x: 300, y: 500, deg: -15 },
		{ x: -80, y: 800, deg: 20 },
		{ x: 250, y: 850, deg: -5 },
		{ x: 600, y: 820, deg: 10 },
		{ x: 0, y: 1100, deg: 25 },
		{ x: 480, y: 1150, deg: -20 },
		{ x: 750, y: 1350, deg: 15 },
		{ x: -50, y: 1450, deg: -35 },
		{ x: 300, y: 1500, deg: -10 },
		{ x: 150, y: 1850, deg: 15 },
		{ x: 580, y: 1700, deg: 5 },
		{ x: -50, y: 2050, deg: -20 },
		{ x: 100, y: 2350, deg: 10 },
		{ x: 450, y: 2250, deg: -5 },
		{ x: 800, y: 2200, deg: -25 },
		{ x: -50, y: 2650, deg: 5 },
		{ x: 300, y: 2750, deg: -10 },
		{ x: 600, y: 2800, deg: 1 }
	];

	const xKey = "id";
	const yKey = "runtimeMinutes";

	// const zKey = "year";
	const p = 0;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};

	function dataMaxLength(data) {
		let maxLength = 0;
		let currentYear = 0;
		data.forEach((d) => {
			const shortMoviesDataLength = d.values.filter(
				(movie) => movie.runtimeMinutes < 120
			).length;
			const longMoviesDataLength = d.values.filter(
				(movie) => movie.runtimeMinutes >= 120
			).length;
			if (shortMoviesDataLength > maxLength) {
				maxLength = shortMoviesDataLength;
				currentYear = d.year;
			}
		});
		// console.log(currentYear, "currentYear");
		// console.log(maxLength, "maxLength");
		return maxLength;
	}

	const maxLength = dataMaxLength(data);

	function putLongMoviesIntheMiddle(data) {
		const longerMovies = data.filter((movie) => movie.runtimeMinutes >= 120);
		const shorterMovies = data.filter((movie) => movie.runtimeMinutes < 120);
		const middleIndex = Math.floor(shorterMovies.length / 2);

		const sortedData = [
			...shorterMovies.slice(0, middleIndex),
			...longerMovies,
			...shorterMovies.slice(middleIndex)
		];

		// 重新分配 id
		return sortedData.map((movie, index) => ({ ...movie, id: index }));
	}

	let isVisibleText = [];
	let isVisible = [];

	function handleEnterText(j) {
		isVisibleText[j] = true;
	}

	function handleExitText(j) {
		isVisibleText[j] = false;
	}
	let lightedFlowers = new Array(data.length).fill(false);

	lightedFlowers[0] = true;

	// function handleEnter(j) {
	// 	isVisible[j] = true;
	// }
	// function handleExit(j) {
	// 	isVisible[j] = false;
	// }

	// 计算长电影数目和占比
	function calculateLongMoviesData(data) {
		const longMoviesCount = data.filter(
			(movie) => movie.runtimeMinutes >= 120
		).length;
		const percentage = ((longMoviesCount / data.length) * 100).toFixed(2);
		return { count: longMoviesCount, percentage };
	}
</script>

<!-- https://svelte.dev/docs/svelte-motion -->
<figure>
	<div class="viz3texts">
		<div
			style="width:320px;transform:translate(-240px,-120px);"
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
			style="width:350px;transform:translate(380px,380px);"
			use:inView
			on:enter={() => handleEnterText(1)}
			on:exit={() => handleExitText(1)}
		>
			{@html copy.fig3.infig2.p1}
		</div>
		<div
			class={`viz3text ${isVisibleText[2] ? "displaytext" : ""}`}
			style="width:380px;transform:translate(340px,2180px)"
			use:inView
			on:enter={() => handleEnterText(2)}
			on:exit={() => handleExitText(2)}
		>
			{@html copy.fig3.infig3.p1}
		</div>
		<div
			class={`viz3text ${lightedFlowers[16] ? "displaytext" : ""}`}
			style="width:80px;transform:translate(585px,1015px);font-size:0.8rem"
			use:inView
			on:enter={() => handleEnterText(3)}
			on:exit={() => handleExitText(3)}
		>
			{@html copy.fig3.infig4.p1}
		</div>
		<div
			class={`viz3text ${lightedFlowers[3] ? "displaytext" : ""}`}
			style="width:100px;transform:translate(430px,-450px);font-size:0.8rem"
			use:inView
			on:enter={() => handleEnterText(4)}
			on:exit={() => handleExitText(4)}
		>
			{@html copy.fig3.infig5.p1}
		</div>
		<div
			class={`viz3text ${lightedFlowers[13] ? "displaytext" : ""}`}
			style="width:100px;transform:translate(-210px,700px);font-size:0.8rem"
			use:inView
			on:enter={() => handleEnterText(5)}
			on:exit={() => handleExitText(5)}
		>
			{@html copy.fig3.infig6.p1}
		</div>
	</div>
	{#each data as d, index}
		{@const { count, percentage } = calculateLongMoviesData(data)}
		<div
			class={`flower ${lightedFlowers[index] ? "lighted" : ""}`}
			style="position: absolute; top:{positionEach[index]
				.y}px; left: {positionEach[index].x}px;"
		>
			<LayerCake
				{padding}
				x={xKey}
				y={yKey}
				xScale={scaleBand()}
				yScale={scaleLinear()}
				data={d.values}
				yDomain={[0, 260]}
				yRange={[0, 330]}
			>
				<Svg>
					<FlowerTree
						flowerIndex={index}
						{maxLength}
						rotateAngle={positionEach[index].deg}
						on:mouseover={(event) => {
							evt = event;
							lightedFlowers[index] = true;
						}}
						on:mouseout={() => {}}
					/>
				</Svg>
			</LayerCake>
		</div>
	{/each}
</figure>

<style>
	/*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 3000px;
		position: relative;
	}
	.flower {
		width: 100px;
		height: 900px;
		opacity: 0.55;
		will-change: opacity;
		transition: opacity 0.5s ease-in-out;
	}
	.viz3text {
		visibility: hidden;
		opacity: 0;
	}

	.viz3texts {
		position: absolute;
		z-index: 1000;
		pointer-events: none;
	}

	.displaytext {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.4s ease-in-out;

		border-radius: 20px;
	}

	.display {
		opacity: 0.45;
		visibility: visible;
		transition: opacity 1s ease-in-out;
	}

	.flower.display:hover {
		opacity: 1;
		transition: opacity 1s ease-in-out;
	}

	.flower.lighted {
		opacity: 1 !important;
		transition: opacity 1s ease-in-out;
	}

	.flower-data {
		background: rgba(255, 255, 255, 0.8);
		padding: 5px;
		border-radius: 5px;
		font-size: 0.8rem;
	}
</style>
