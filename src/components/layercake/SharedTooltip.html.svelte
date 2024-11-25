<!--
  @component
  Generates a tooltip that works on multiseries datasets, like multiline charts. It creates a tooltip showing the name of the series and the current value. It finds the nearest data point using the [QuadTree.html.svelte](https://layercake.graphics/components/QuadTree.html.svelte) component.
 -->
<script>
	import { getContext } from "svelte";
	import { format } from "d3-format";

	import QuadTree from "./QuadTree.html.svelte";
	import { fade } from "svelte/transition";

	const { data, width, yScale, config } = getContext("LayerCake");

	const commas = format(",");
	const titleCase = (d) => d.replace(/^\w/, (w) => w.toUpperCase());

	/** @type {Function} [formatTitle=d => d] - A function to format the tooltip title, which is `$config.x`. */
	export let formatTitle = (d) => d;

	/** @type {Function} [formatValue=d => isNaN(+d) ? d : commas(d)] - A function to format the value. */
	export let formatValue = (d) => (isNaN(+d) ? d : commas(d));

	/** @type {Function} [formatKey=d => titleCase(d)] - A function to format the series name. */
	export let formatKey = (d) => titleCase(d);

	/** @type {Number} [offset=-20] - A y-offset from the hover point, in pixels. */
	export let offset = 80;

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
			.filter((d) => d !== $config.x)
			.map((key) => {
				return {
					key,
					value: result[key]
				};
			})
			.sort((a, b) => b.value - a.value);

		return rows;
	}
</script>

<QuadTree
	dataset={dataset || $data}
	y="x"
	let:x
	let:y
	let:visible
	let:found
	let:e
>
	{@const foundSorted = sortResult(found)}

	{#if visible === true}
		<div style="left:{x}px;" class="line" />
		<div
			class="tooltip"
			style="
          width:{w}px;
          display: {visible ? 'block' : 'none'};
          top:{$yScale(foundSorted[0].value) + offset}px;
          left:{Math.min(Math.max(w2, x), $width - w2)}px;"
		>
			<div class="title">{parseInt(found[$config.x])}</div>
			{#each foundSorted as row}
				<div class="row">
					<span class="key"
						>{row.key === "MedianRuntime"
							? "中位数时长"
							: formatKey(row.key)}:</span
					>
					{formatValue(row.value)} 分钟
				</div>
			{/each}
		</div>
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
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
	.line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		border-left: 3px dotted gold;
		pointer-events: none;
	}
	.tooltip {
		transition: left 250ms ease-out, top 250ms ease-out;
	}
	.title {
		font-weight: bold;
	}
	.key {
		color: var(--color-white);
	}
</style>
