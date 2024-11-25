<script>
	import { getContext } from "svelte";
	import { fade } from "svelte/transition";

	const { xScale, yScale } = getContext("LayerCake");

	export let x = 0;
	export let y = 0;
	export let annotationText = "";

	let xlinePosition;
	let ylinePosition;

	$: {
		xlinePosition = $xScale(x);
		ylinePosition = $yScale(y);
	}
</script>

{#if x !== 0}
	<div
		style="left:{xlinePosition}px;"
		class="xline"
		transition:fade={{ duration: 150 }}
	/>
	<p
		style="position: absolute; left:{xlinePosition - 20}px; bottom:100%;"
		class="annotation"
		transition:fade={{ duration: 150 }}
	>
		{annotationText}
	</p>
{/if}

{#if y !== 0}
	<div
		style="top:{ylinePosition}px;"
		class="yline"
		transition:fade={{ duration: 150 }}
	/>
	<p
		style="position: absolute; top:{ylinePosition}px; right:100%;"
		class="annotation"
		transition:fade={{ duration: 150 }}
	>
		{annotationText}
	</p>
{/if}

<style>
	.xline {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		border-left: 2px dotted whitesmoke;
		pointer-events: none;
	}
	.yline {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		border-top: 2px dotted whitesmoke;
		pointer-events: none;
	}
	.annotation {
		color: whitesmoke;
		font-size: 12px;
	}
</style>
