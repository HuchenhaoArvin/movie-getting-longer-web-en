<!--
  @component
  Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->
<script>
	import { getContext } from "svelte";
	import { run } from "svelte/internal";
	import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";

	const { data, xGet, yGet, zGet, yScale, xScale, zScale } =
		getContext("LayerCake");
</script>

<!-- 画一个横着向下扩展的barchart，x是每个数据点的值，每个z对应一个series，也即一年的数据，在每一年里y值随机分配 -->
<!-- y值还是要改回成时间，现在这个逻辑不顺，当每个z对应一个series时，y值应该是时间，而不是随机分配的值 -->

<defs>
	<linearGradient id="myGradient" gradientTransform="rotate(0)">
		<stop offset="10%" stop-color="grey" />
		<stop offset="100%" stop-color="gold" />
	</linearGradient>
</defs>

<g class="bar-group">
	{#each $data as series, j}
		{#each series.values as d, i}
			{#if i === 0}
				<!-- This line and text will be created for the first d of each series -->
				<text
					x="0"
					y={$yScale(d.id)}
					dy="-0.25em"
					dx="0.25em"
					style="font-size: 12px; fill: whitesmoke;"
					class="annotation"
				>
					{series.year}
				</text>
			{/if}
			<rect
				data-id={i}
				x={0}
				y={$yScale(d.id)}
				width={$xScale(d.runtimeMinutes >= 180 ? 180 : d.runtimeMinutes)}
				height={$yScale.bandwidth()}
				fill={d.runtimeMinutes >= 120 ? "url(#myGradient)" : "grey"}
				rx="1"
			/>
			{#if d.runtimeMinutes >= 180}
				<circle
					cx={$xScale(180) + 10}
					cy={$yGet(d) + $yScale.bandwidth() / 2}
					r="2.5"
					fill="red"
				/>
			{/if}
		{/each}

		<!-- </g> -->
	{/each}
</g>

<!-- <rect
			class='group-rect'
			data-id="{i}"
			x="{$xScale.range()[0]}"
			y="{$yGet(d)}"
			height={$yScale.bandwidth()}
			width="{$xGet(d)}"
			{fill}
		></rect> -->
