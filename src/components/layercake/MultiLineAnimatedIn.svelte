<!-- 
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { getContext, onMount, tick } from "svelte";
	// import d3 from "d3";
	import {
		line,
		select,
		selectAll,
		interpolateString,
		interpolate,
		curveBasis
	} from "d3";
	import { flip } from "svelte/animate";
	import { draw, fade } from "svelte/transition";
	import { cubicInOut, elasticOut, cubicIn, cubicOut } from "svelte/easing";
	import { tweened } from "svelte/motion";

	const { data, xGet, yGet, zGet } = getContext("LayerCake");
	let pathElements;
	let readyToDraw = false;
	export let value;
	export let initData;

	// 使用 D3.js 的 line 和 curve 插值函数生成平滑曲线
	$: lineGenerator = line()
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

	function maskout(node, { duration, delay = 0 }) {
		return {
			duration,
			delay,
			css: (t) => {
				const eased = cubicOut(t);
				return `
                opacity: ${1 - eased};
                stroke: gold;
                
            `;
			}
		};
	}

	let pathForValueLessOrEqualOne;
	let pathForValueGreaterThanOne;
	let interpolators;
	requestAnimationFrame(() => {
		readyToDraw = true;
	});

	$: {
		pathForValueLessOrEqualOne = initData.map((group) =>
			lineGenerator(group.values)
		);

		pathForValueGreaterThanOne = $data.map((group) =>
			lineGenerator(group.values)
		);
		interpolators = pathForValueGreaterThanOne.map(
			(pathForValueGreaterThanOne) => {
				return interpolateString(
					pathForValueLessOrEqualOne,
					pathForValueGreaterThanOne
				);
			}
		);
	}

	const animatePaths = tweened(0, {
		duration: 1400,
		easing: cubicOut
	});

	$: if (readyToDraw) {
		animatePaths.set(1);
	}
</script>

{#if readyToDraw}
	<g class="line-group">
		{#each interpolators as interpolatePath, i}
			<path
				class="path-line"
				d={interpolatePath($animatePaths)}
				stroke={$zGet($data[i])}
				fill="none"
				stroke-width="2.5px"
				stroke-linejoin="round"
				stroke-linecap="round"
			/>
			<path
				class="path-mask"
				d={interpolatePath($animatePaths)}
				stroke="gold"
				fill="none"
				opacity="0"
				stroke-width="2.5px"
				stroke-linejoin="round"
				stroke-linecap="round"
				in:maskout={{ duration: 500, delay: 800 }}
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
