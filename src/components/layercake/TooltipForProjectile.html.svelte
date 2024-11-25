<!--
  @component
  Generates a tooltip that works on multiseries datasets, like multiline charts. It creates a tooltip showing the name of the series and the current value. It finds the nearest data point using the [QuadTree.html.svelte](https://layercake.graphics/components/QuadTree.html.svelte) component.
 -->
<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { format } from "d3-format";

	import QuadTree from "./QuadTree.html.svelte";
	import { fade } from "svelte/transition";

	const { data, width, yScale, xScale, config } = getContext("LayerCake");

	const commas = format(",");
	const titleCase = (d) => d.replace(/^\w/, (w) => w.toUpperCase());
	const dispatch = createEventDispatcher();

	/** @type {Function} [formatTitle=d => d] - A function to format the tooltip title, which is `$config.x`. */
	export let formatTitle = (d) => d;

	/** @type {Function} [formatValue=d => isNaN(+d) ? d : commas(d)] - A function to format the value. */
	export let formatValue = (d) => (isNaN(+d) ? d : commas(d));

	/** @type {Function} [formatKey=d => titleCase(d)] - A function to format the series name. */
	export let formatKey = (d) => titleCase(d);

	/** @type {Number} [offset=-20] - A y-offset from the hover point, in pixels. */
	export let offset = 30;

	/** @type {Array} [dataset] - The dataset to work off of—defaults to $data if left unset. You can pass something custom in here in case you don't want to use the main data or it's in a strange format. */
	export let dataset = undefined;

	const w = 150;
	const w2 = w / 2;

	/* --------------------------------------------
	 * Sort the keys by the highest value
	 */
	function sortResult(result) {
		if (Object.keys(result).length === 0) return [];
		const rows = Object.keys(result)
			// .filter((d) => d !== $config.x)
			.map((key) => {
				return {
					key,
					value: result[key]
				};
			})
			.sort((a, b) => b.value - a.value);

		return rows;
	}

	function handleFoundChange(event) {
		// 将 found 值向上传递
		dispatch("TooltipEvent", event.detail);
	}

	function formatChineseNumber(num) {
		if (num >= 1000000) {
			return "$" + (num / 1000000).toFixed(0) + "MM USD";
		} else {
			return num.toString();
		}
	}
</script>

<QuadTree
	dataset={dataset || $data}
	x="y"
	let:x
	let:y
	let:visible
	let:found
	let:e
	on:foundChange={handleFoundChange}
>
	{@const foundSorted = sortResult(found)}
	<!-- {@debug found} -->
	{#if visible === true}
		<div style="top:{y}px;" class="line" />
		<div
			class="tooltip"
			style="
          width:{w}px;
          display: {visible ? 'block' : 'none'};
          top:{$yScale(found.startYear) - offset}px;
          left:{$width - w2}px;"
		>
			<!-- <div class="title">Year {parseInt(formatTitle(found[$config.x]))}</div> -->
			<!-- {#each foundSorted as row}
				<div class="row">
					<span class="key">{formatKey(row.key)}:</span>
					{row.value}
					{#if $data.find((item) => item.startYear === row.value)}
						<span>
							{$data.find((item) => item.startYear === row.value).startYear}
						</span>
					{/if}
				</div>
			{/each} -->
			<!-- {#each Object.entries(found) as [key, value]}
				{#if key === "startYear"}
					<div class="title">Year {value}</div>
				{:else}
					<div class="row">
						<span class="key">{key}:</span>
						{value}{#if $data.find((item) => item.startYear === value)}
							<span>
								{$data.find((item) => item.startYear === value).startYear}
							</span>
						{/if}
					</div>
				{/if}
			{/each} -->
			<div class="title">{found[$config.y]}</div>
			<div class="row">
				<div class="long">
					Long Movies: {formatChineseNumber(
						$data.find((item) => item[$config.y] === found[$config.y])[
							$config.x
						]
					)}
					<div class="short">
						Short Movies: {formatChineseNumber(found[$config.x])}
					</div>
				</div>
			</div>
		</div>
		<!-- {#if $data.find((item) => item.startYear === found.startYear)}
				<div class="row">
					
			{/if} -->
		<!-- </div> -->
	{/if}
</QuadTree>

<style>
	.tooltip {
		position: absolute;
		font-size: 0.65rem;
		pointer-events: none;
		/* border: 1px solid #ccc; */
		border-radius: 3px;
		transform: translate(-50%, -100%);
		padding: 0.5rem;
		z-index: var(--z-overlay);
		pointer-events: none;
		color: gold;
		opacity: 0.9;
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
	.line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px; /* 水平线的高度 */
		border-top: 2px dotted gold; /* 设置为顶部边框以创建水平线 */
		pointer-events: none;
	}
	.tooltip {
		transition: left 250ms ease-out, top 250ms ease-out;
	}
	.title {
		font-weight: bold;
	}
	.short {
		color: var(--color-white);
	}
</style>
