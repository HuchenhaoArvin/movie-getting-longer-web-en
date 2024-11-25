<script>
	import { LayerCake, Svg, Html } from "layercake";
	import Line from "$components/layercake/Line.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { fade } from "svelte/transition";
	import Tooltip from "../layercake/Tooltip.html.svelte";
	import Scatter from "../layercake/Scatter.svg.svelte";
	import SharedTooltip from "../layercake/SharedTooltip.html.svelte";
	import Projectile from "../layercake/Projectile.svelte";
	import { format, precisionFixed } from "d3-format";

	import { scaleBand, scaleOrdinal } from "d3-scale";
	import { max } from "d3-array";
	import TooltipForProjectile from "../layercake/TooltipForProjectile.html.svelte";

	export let value;
	export let transformedRatingData;
	export let transformedGrossData;

	let evt;
	let hideTooltip = true;
	let foundData;

	const x1 = "averageRating";
	const x2 = "MedianWorldwideGross";
	const y = "startYear";
	const z = "form";
	const p = 20;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};

	const seriesColors = ["gold", "white"];
	$: maxValue1 = max(transformedRatingData, (d) => d.averageRating);
	$: maxValue2 = max(transformedGrossData, (d) => d.MedianWorldwideGross);

	const formatTickX = (d) => formatChineseNumber(d);

	function formatChineseNumber(num) {
		if (num >= 10000) {
			return num / 1000000;
		} else {
			return num.toString();
		}
	}

	function handleTooltipEvent(event) {
		foundData = event.detail.found;
	}

	function handleMouseOut() {
		hideTooltip = true;
		foundData = undefined;
	}
</script>

<!-- 提前加载数据 -->
{#if value !== undefined}
	<section transition:fade={{ duration: 300 }}>
		{#if value === 0 || value === 1}
			<figure
				class="rating"
				on:mouseout={handleMouseOut}
				on:blur={handleMouseOut}
				in:fade={{ duration: 1000 }}
			>
				<h2>Median Movie Rating by Year</h2>
				<LayerCake
					data={transformedRatingData}
					x={x1}
					{y}
					{z}
					{padding}
					zScale={scaleOrdinal()}
					zRange={seriesColors}
					xDomain={[0, maxValue1]}
					yDomain={[1980, 2025]}
				>
					<Svg>
						<AxisX
							gridlines={false}
							tickMarks={true}
							baseline={true}
							unitText="Score"
							unitTextdx={10}
						/>
						<AxisY gridlines={false} unitText="Year" />
						<Projectile tooltip={foundData} />
					</Svg>
					<Html>
						<TooltipForProjectile on:TooltipEvent={handleTooltipEvent} />
					</Html>
				</LayerCake>
			</figure>
		{/if}
		{#if value === 2 || value === 3 || value === 4}
			<figure
				class="gross"
				on:mouseout={handleMouseOut}
				on:blur={handleMouseOut}
				in:fade={{ duration: 1000 }}
			>
				<h2>Median Movie Gross by Year</h2>
				<LayerCake
					data={transformedGrossData}
					x={x2}
					{y}
					{z}
					{padding}
					zScale={scaleOrdinal()}
					zRange={seriesColors}
					xDomain={[0, maxValue2]}
					yDomain={[1980, 2025]}
				>
					<Svg>
						<AxisX
							gridlines={false}
							tickMarks={true}
							formatTick={formatTickX}
							baseline={true}
							unitText="MM USD"
							unitTextdx={20}
						/>
						<AxisY gridlines={false} tickMarks={true} unitText="Year" />

						<Projectile tooltip={foundData} />
					</Svg>
					<Html>
						<TooltipForProjectile on:TooltipEvent={handleTooltipEvent} />
					</Html>
				</LayerCake>
			</figure>
		{/if}
	</section>
{/if}

<style>
	h2 {
		font-size: 1.75rem;
		font-weight: 600;
		margin-left: -45px; /* 根据需要调整偏移量 */
		margin-bottom: 30px;
	}
	figure {
		margin: 1rem auto;
		width: 50vw; /* It will try to take the full width of its parent */
		height: 55vh;
	}
</style>
