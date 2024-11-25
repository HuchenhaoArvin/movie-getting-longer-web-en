<script>
	import { line, curveLinear, scaleLinear, extent } from "d3";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import { onMount, onDestroy } from "svelte";
	import MedianRuntimeData from "$data/median_runtime_by_year.csv";

	const data = MedianRuntimeData.map(({ Year, Median_Runtime }) => ({
		startYear: +Year,
		runtimeMinutes: +Median_Runtime
	}));

	export let stroke = "red";

	let x = (d) => d.startYear;
	let y = (d) => d.runtimeMinutes;

	let scaleX = scaleLinear().domain(extent(data, x)).nice();
	let scaleY = scaleLinear().domain(extent(data, y)).nice();

	// 设置视口的宽度和高度
	let width = 800;
	let height = 600;

	// 调整比例尺的范围以适应视口
	scaleX.range([0, width]);
	scaleY.range([height, 0]);

	let pathGenerator = line()
		.x((d) => scaleX(x(d)))
		.y((d) => scaleY(y(d)))
		.curve(curveLinear);
	let pathD = pathGenerator(data);

	let length;
	const progress = tweened(0, { duration: 3000, easing: cubicOut });

	let pathElement;
	let cancelAnimation = null;

	onMount(() => {
		length = pathElement.getTotalLength();
		progress.set(0);

		// Start the animation
		cancelAnimation = progress.update((n) => length);
	});

	onDestroy(() => {
		// Stop the animation
		if (cancelAnimation) {
			cancelAnimation();
		}
	});
</script>

<svg viewBox={`0 0 ${width} ${height}`}>
	<path
		d={pathD}
		{stroke}
		bind:this={pathElement}
		style="stroke-dasharray: {length}; 
		stroke-dashoffset: {length - $progress}"
	/>
</svg>

<style>
	path {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>
