<script>
	import { getContext } from "svelte";
	import { max } from "d3-array";
	import { fade } from "svelte/transition";

	const { data, x, y, xScale, yScale, xRange, yRange, z } =
		getContext("LayerCake");

	export let highlighted = "";
	export let dx = 0; // Define dx offset
	export let dy = 0; // Define dy offset

	$: left = (values) => $xScale(max(values, $x)) / Math.max(...$xRange);
	$: top = (values) => $yScale(max(values, $y)) / Math.max(...$yRange);
</script>

{#each $data as group}
	{#if highlighted.includes(group.group)}
		<div
			class="label"
			style="
                top: calc({top(group.values) * 100}% + {dy}px);
                left: calc({left(group.values) * 100}% + {dx}px);
            "
			transition:fade={{ duration: 150 }}
		>
			{max(group.values, $y)}
		</div>
	{/if}
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%) translateY(1px);
		font-size: 0.9rem;
		pointer-events: none;
	}
</style>
