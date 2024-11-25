<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import MoviesFullData from "$data/top_10_percent_movies_after_1990_full_detail.csv";
	import MoviesNodesData from "$data/nodes_for_last_viz.csv";

	import { getContext } from "svelte";
	import MainViz5 from "$components/main/Main.Viz5.svelte";
	const copy = getContext("copy");
	// console.log("copy", copy);
</script>

<section id="fig4scrolly">
	<!-- <h2>Scrolly <span>{value}</span></h2> -->
	<!-- need to rethink this part -->
	<section id="viz5">
		<MainViz5 {MoviesFullData} {MoviesNodesData} />
	</section>
</section>

<style>
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 75vh;
	}

	#viz5 {
		position: relative;
		left: -10rem;
		width: 60rem;
		height: 2826px;
		margin-bottom: 5rem;
	}
</style>
