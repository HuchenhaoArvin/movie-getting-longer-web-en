<script>
	import { LayerCake, Svg, Html, flatten } from "layercake";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";

	import { fade } from "svelte/transition";
	import MultiLine from "../layercake/MultiLine.svelte";
	import MultiLineAnimatedIn from "../layercake/MultiLineAnimatedIn.svelte";
	import { scaleOrdinal } from "d3-scale";
	import SharedTooltip from "../layercake/SharedTooltip.html.svelte";
	import { format, precisionFixed } from "d3-format";

	export let value; // add this line to accept value from parent component
	export let MedianRuntimeData;

	const seriesNames = Object.keys(MedianRuntimeData[0]).filter((d) => d !== x);

	const seriesColors = [
		"gold",
		"white",
		"white",
		"white",
		"white",
		"white",
		"white",
		"white",
		"white",
		"white"
	];

	// const data = percentiles.map((percentile) => {
	// 	return {
	// 		values: MedianRuntimeEachViewGroupData.map((d) => ({
	// 			startYear: +d.startYear,
	// 			value: +d[percentile]
	// 		}))
	// 	};
	// });

	const x = "startYear";
	const y = "value";
	const z = "group";
	const p = 20;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};
	const data = seriesNames.map((key) => {
		return {
			[z]: key,
			values: MedianRuntimeData.map((d) => {
				return {
					[y]: +d[key],
					[x]: d[x],
					[z]: key
				};
			})
		};
	});

	// $: filteredData =
	// 	value === 0 || value === 1
	// 		? data.filter((d) => d.group === "Total")
	// 		: data.filter((d) => d.group != "Total");
	// $: dataforTooltip = flatten(filteredData);
	let filteredData;
	let dataforTooltip;
	let filteredDataSingle;
	let dataforTooltipSingle;

	filteredData = data.filter((d) => d.group !== "Total");
	filteredDataSingle = data.filter((d) => d.group === "Total");
	dataforTooltipSingle = MedianRuntimeData.map((d) => {
		return {
			startYear: d.startYear,

			MedianRuntime: d.Total
		};
	});
	dataforTooltip = MedianRuntimeData.map(({ Total, ...rest }) => rest);

	// $: {
	// 	filteredData =
	// 		value === 0 || value === 1
	// 			? data.filter((d) => d.group === "Total")
	// 			: data.filter((d) => d.group != "Total");
	// 	dataforTooltip =
	// 		value === 0 || value === 1
	// 			? MedianRuntimeData.map((d) => {
	// 					return {
	// 						startYear: d.startYear,
	// 						MedianRating: d.Total
	// 					};
	// 			  })
	// 			: MedianRuntimeData.map(({ Total, ...rest }) => rest);
	// }

	const formatTickX = (d) => d;
	const formatTickY = (d) => format(`.${precisionFixed(d)}s`)(d);

	// console.log(data, "!!!!!!!!!!!!");
</script>

{#if value >= 0 && value <= 5}
	<section transition:fade={{ duration: 100 }}>
		{#if value === 0 || value === 1}
			<figure>
				<h2>历年电影时长的中位数</h2>
				<LayerCake
					data={filteredDataSingle}
					{x}
					{y}
					{z}
					{padding}
					zScale={scaleOrdinal()}
					zRange={seriesColors}
					flatData={flatten(filteredDataSingle, "values")}
					yDomain={[0, 120]}
				>
					<Svg>
						<AxisX
							gridlines={false}
							tickMarks={true}
							baseline={true}
							unitText="（年）"
							unitTextdx={10}
						/>
						<AxisY gridlines={false} showUnit={true} unitText="（分钟）" />
						<MultiLine {value} />
					</Svg>
					<Html>
						<SharedTooltip dataset={dataforTooltipSingle} />
					</Html>
				</LayerCake>
			</figure>
		{/if}
		{#if value === 2 || value === 3}
			<figure>
				<h2>评论数前10%电影时长的中位数</h2>
				<LayerCake
					data={filteredData}
					{x}
					{y}
					{z}
					{padding}
					zScale={scaleOrdinal()}
					zRange={seriesColors}
					flatData={flatten(filteredData, "values")}
					yDomain={[0, 120]}
				>
					<Svg>
						<AxisX
							tickMarks={true}
							gridlines={false}
							baseline={true}
							unitText="（年）"
							unitTextdx={10}
						/>
						<AxisY gridlines={false} showUnit={true} unitText="（分钟）" />
						<MultiLineAnimatedIn {value} initData={filteredDataSingle} />
					</Svg>
					<Html>
						<SharedTooltip dataset={dataforTooltip} />
					</Html>
				</LayerCake>
			</figure>
		{/if}
	</section>
{/if}

<style>
	h2 {
		font-size: 2rem;
		font-weight: 600;
		margin-left: -35px; /* 根据需要调整偏移量 */
		margin-bottom: 30px;
	}
	figure {
		margin: 1rem auto;
		width: 45vw; /* It will try to take the full width of its parent */
		height: 50vh;
	}
</style>
