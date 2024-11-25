<script>
	import { getContext } from "svelte";

	const { padding, xRange, yScale } = getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = true;
	export let xTick = -25;
	export let yTick = 0;
	export let dxTick = 9.5;
	export let dyTick = -4;
	export let textAnchor = "end";
	export let formatTick = (d) => d;
	export let ticks = 4;
	export let textColor = "#fff6cb";
	export let unitText = "";

	/** If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */

	$: isBandwidth = typeof $yScale.bandwidth === "function";

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $yScale.domain()
		: typeof ticks === "function"
		? ticks($yScale.ticks())
		: $yScale.ticks(ticks);
</script>

<g class="axis y-axis" transform="translate({-$padding.left}, 0)">
	{#each tickVals as tick, i}
		<g
			class="tick tick-{tick}"
			transform="translate({$xRange[0]}, {$yScale(tick)})"
		>
			{#if gridlines !== false}
				<line class="gridline" x2="100%" y1={yTick} y2={yTick} />
			{/if}
			{#if tickMarks === true}
				{#if i === 0}
					<line
						class="tick-mark"
						x1="-35"
						x2={20}
						y1={yTick + 0.4}
						y2={yTick + 0.4}
					/>
				{:else}
					<line
						class="tick-mark"
						x1="-35"
						x2={-15}
						y1={yTick + 0.4}
						y2={yTick + 0.4}
					/>
				{/if}
				<text
					x={xTick}
					y={yTick}
					dx={dxTick}
					dy={dyTick}
					style="text-anchor:{textAnchor}; fill: {textColor};"
					>{formatTick(tick)}</text
				>
				{#if i === tickVals.length - 1}
					<text
						x={xTick + 3}
						y={yTick}
						dx={dxTick}
						dy={dyTick}
						style="text-anchor:start; fill: {textColor};">{unitText}</text
					>
				{/if}
			{/if}
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: var(--color-gray-300);
	}
	.tick .gridline {
		stroke-dasharray: 4px 4px;
	}

	.tick text {
		fill: var(--color-white);
	}
</style>
