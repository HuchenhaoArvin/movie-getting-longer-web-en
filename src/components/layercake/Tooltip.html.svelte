<script>
	// svelte event created via dispatch
	export let evt = {};
	export let offsetY = -35;
	export let offsetX = 0;

	let top;
	let left;

	$: if (evt.detail) {
		top = `${evt.detail.e.layerY + offsetY}px`;
		left = `${evt.detail.e.layerX + offsetX}px`;
	}
</script>

{#if evt.detail}
	<div style:top style:left>
		<small>
			<slot detail={evt.detail} />
		</small>
	</div>
{/if}

<style>
	div {
		position: absolute;
		width: auto;
		min-width: 12rem;
		border-radius: 3px;
		/* border: 1px solid var(--color-white); */
		transform: translate(-50%, -100%);
		padding: 0.5em;
		z-index: var(--z-top);
		opacity: 1;
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		font-size: 1rem;
	}
</style>
