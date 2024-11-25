<!-- <script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let r = 4;
	export let fill = "#ccc";
	export let stroke = "#000";
	export let strokeWidth = 0;
</script>

<g>
	{#each $data as d}
		{@const cx = $xGet(d)}
		{@const cy = $yGet(d)}
		<circle {cx} {cy} {r} {fill} {stroke} stroke-width={strokeWidth} />
	{/each}
</g> -->

<script>
	import { getContext, createEventDispatcher } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let r = 2.5;
	export let fill = "gold";
	export let stroke = "#000";
	export let strokeWidth = 0;

	const dispatch = createEventDispatcher(); // Create event dispatcher
	let evt = {}; // Variable to hold current event

	function hoverHandler() {
		// evt = evt.detail.e; // Set evt to current event
		dispatch("hover", evt); // Dispatch hover event
	}

	function mouseleaveHandler() {
		evt = {}; // Reset evt
		dispatch("mouseleave", evt); // Dispatch mouseleave event
	}
</script>

<g>
	{#each $data as d}
		{@const cx = $xGet(d)}
		{@const cy = $yGet(d)}
		<circle
			{cx}
			{cy}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
			on:mouseover={(e) => {
				evt = { e, d };
				hoverHandler();
			}}
			on:focus={(e) => {
				evt = { e, d };
				hoverHandler();
			}}
			on:mouseleave={() => {
				mouseleaveHandler();
			}}
		/>
	{/each}
</g>
