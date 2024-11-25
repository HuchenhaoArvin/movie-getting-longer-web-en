<script>
	import { getContext } from "svelte";
	const { width, height, xScale, yRange } = getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = false;
	export let baseline = false;
	export let snapTicks = false;
	export let yTick = 16;
	export let formatTick = (d) => d;
	export let ticks = undefined;
	export let reverseTickMarks = false;
	export let textAboveAxis = false;
	export let textColor = "#fff6cb";
	export let unitTextdx = 0;
	export let unitText = ""; // 新增单位文本变量

	/** If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */

	$: tickVals = Array.isArray(ticks)
		? ticks
		: typeof ticks === "function"
		? ticks($xScale.ticks())
		: $xScale.ticks(ticks);

	const textAnchor = (i) => {
		if (snapTicks === true) {
			if (i === 0) {
				return "start";
			}
			if (i === tickVals.length - 1) {
				return "end";
			}
		}
		return "middle";
	};
</script>

<g class="axis x-axis" class:snapTicks>
	{#each tickVals as tick, i}
		<g
			class="tick tick-{i}"
			transform="translate({$xScale(tick)},{$yRange[0]})"
		>
			{#if gridlines !== false}
				<line class="gridline" y1={$height * -1} y2="0" x1="0" x2="0" />
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" y1={0} y2={6} x1={0} x2={0} />
			{/if}
			<text
				class={reverseTickMarks ? "reverse-tick-text" : ""}
				x={0}
				y={textAboveAxis ? -yTick : yTick}
				dx=""
				dy="5"
				text-anchor={textAnchor(i)}>{formatTick(tick)}</text
			>
		</g>
	{/each}
	{#if baseline === true}
		<line
			class="baseline"
			y1={$height + 0.5}
			y2={$height + 0.5}
			x1="0"
			x2={$width + 20}
		/>

		<text
			class="unit-text"
			x={$width + unitTextdx + 30}
			y={$yRange[0] + yTick + 5}
			style="text-anchor:end; fill: {textColor};">{unitText}</text
		>
	{/if}

	<!-- 延长线和单位文本 -->
</g>

<style>
	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	line,
	.tick line {
		stroke: var(--color-gray-300);
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #fff6cb;
	}

	.tick .tick-mark,
	.baseline {
		stroke-dasharray: 0;
	}

	/* This looks slightly better */
	.axis.snapTicks .tick:last-child text {
		transform: translateX(3px);
	}
	.axis.snapTicks .tick.tick-0 text {
		transform: translateX(-3px);
	}

	.reverse-tick-text {
		transform: scale(-1, 1);
	}

	.unit-text {
		font-size: 0.725em;
		font-weight: 600;
	}
</style>
