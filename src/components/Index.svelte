<script>
	import { onMount } from "svelte";
	import Main from "$components/main/Main.svelte";
	import Footer from "$components/Footer.svelte";

	let isMobile = false;

	function checkDevice() {
		return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	onMount(() => {
		isMobile = checkDevice();
	});
</script>

{#if isMobile}
	<div class="mobile-message">
		<p>请在电脑端浏览以获得最佳体验</p>
		<p>如仍需继续请点击下面的按钮</p>
		<button on:click={() => (isMobile = false)}>继续访问</button>
	</div>
{:else}
	<Main />
	<Footer />
{/if}

<style>
	.mobile-message {
		text-align: center;
		margin-top: 50px;
		font-size: 18px;
		color: #fff6cb;
		background: rgba(150, 150, 150, 0.2);
		width: 100%;
		height: max-content;
		padding: 20px 20px;
	}

	button {
		margin-top: 20px;
		padding: 10px 20px;

		color: #fff6cb;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
