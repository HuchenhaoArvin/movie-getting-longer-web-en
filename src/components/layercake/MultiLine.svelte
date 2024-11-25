<!-- 
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { getContext, onMount, tick } from "svelte";
	// import d3 from "d3";
	import { line, select, selectAll, curveBasis } from "d3";
	import { flip } from "svelte/animate";
	import { draw, fade } from "svelte/transition";
	import { cubicInOut, elasticOut, cubicIn, cubicOut } from "svelte/easing";
	import { tweened } from "svelte/motion";

	const { data, xGet, yGet, zGet } = getContext("LayerCake");
	let pathElements;
	let readyToDraw = false;
	export let value;

	// 使用 D3.js 的 line 和 curve 插值函数生成平滑曲线
	const lineGenerator = line()
		.x((d) => $xGet(d))
		.y((d) => $yGet(d))
		.curve(curveBasis); // 使用贝塞尔曲线生成平滑曲线，你可以尝试其他曲线插值函数

	$: paths = $data.map((group) => ({
		path: lineGenerator(group.values),
		color: $zGet(group)
	}));

	onMount(async () => {
		await tick(); // 等待Svelte更新DOM
		readyToDraw = true; // 现在设置一个标志，允许路径动画开始
	});
</script>

{#if readyToDraw}
	<g class="line-group">
		{#each paths as { path, color }}
			<path
				class="path-line"
				d={path}
				stroke={color}
				in:draw={{ duration: 1200, delay: 100 }}
				fill="none"
				stroke-width="2.5px"
				stroke-linejoin="round"
				stroke-linecap="round"
			/>
		{/each}
	</g>
{/if}

<style>
	/* .path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2.5px;
	} */
</style>
