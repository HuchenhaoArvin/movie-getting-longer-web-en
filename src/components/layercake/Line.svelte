<script>
	import { getContext, onMount, tick } from "svelte";
	import { line, curveLinear, curveBasis } from "d3";
	import { draw } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";

	const { data, xGet, yGet } = getContext("LayerCake");

	export let stroke = "#ccc";
	export let curve = curveBasis;

	let pathD;
	let readyToDraw = false;

	$: pathGenerator = line().x($xGet).y($yGet).curve(curve);
	$: pathD = pathGenerator($data);

	onMount(async () => {
		await tick(); // 等待Svelte更新DOM
		readyToDraw = true; // 现在设置一个标志，允许路径动画开始
	});
</script>

{#if readyToDraw}
	<path
		in:draw={{ duration: 2500, delay: 200, easing: cubicInOut }}
		d={pathD}
		{stroke}
	/>
{/if}

<style>
	path {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2.5px;
	}
</style>
