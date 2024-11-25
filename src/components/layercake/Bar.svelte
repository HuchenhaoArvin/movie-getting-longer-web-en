<!-- <script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let fill = "#ccc";
</script>

<g>
	{#each $data as d, i}
		{@const x = $xScale.range()[0]}
		{@const y = $yGet(d)}
		{@const width = $xGet(d)}
		{@const height = $yScale.bandwidth()}
		<rect data-id={i} {x} {y} {width} {height} {fill} />
	{/each}
</g> -->

<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	// Assuming xGet and yGet are defined as follows:
	// let xGet = d => d.startYear;
	// let yGet = d => d.runtimeMinutes;

	export let fill = "#ccc";
</script>

<g>
	{#each $data as d, i (d.primaryTitle)}
		{@const x = $xScale($xGet(d))}
		{@const y = $yScale($yGet(d))}
		{@const width = $xScale.bandwidth()}
		{@const height = $yScale.range()[0] - y}
		<rect data-id={i} {x} {y} {width} {height} {fill} />
	{/each}
</g>
