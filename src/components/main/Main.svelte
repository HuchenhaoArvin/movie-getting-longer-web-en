<script>
	import { getContext } from "svelte";

	import MainIntro from "./Main.Intro.svelte";

	import MainSection1 from "./Main.Section1.svelte";
	import MainSection2 from "./Main.Section2.svelte";
	import MainSection3 from "./Main.Section3.svelte";
	import MainSection4 from "./Main.Section4.svelte";
	// import DemoScrolly from "../demo/Demo.Scrolly.svelte";
	const copy = getContext("copy");
</script>

<div id="main-intro">
	<MainIntro />
</div>

<!-- <div id="main-title">
	<MainTitle />
</div> -->

<div id="background" />

<div id="main">
	<div id="main-sections">
		<MainSection1 />
		<MainSection2 />
		<MainSection3 />

		<MainSection4 />
		<!-- 这一部分的宽度估计是固定的，以至于让整个页面的宽度减小之后，下面会出现滚动条 -->
	</div>
</div>

<style>
	#main {
		max-width: 40rem;
		margin: 0 auto;
		padding: 16px;
		font-size: 1.1rem;
	}

	:global(#main section) {
		margin: 0 auto;
		padding-top: 32px;
	}

	:global(#main h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
	:global(.highlight-text1) {
		color: gold;
	}
	:global(.highlight-text2) {
		color: white;
	}
	:global(body::-webkit-scrollbar) {
		width: 8px;
		background-color: #f1f1f1;
	}

	:global(body::-webkit-scrollbar-thumb) {
		background-color: gold;
		border-radius: 4px;
	}

	:global(body::-webkit-scrollbar-thumb:hover) {
		background-color: #d4af37;
	}
	.spacer {
		height: 75vh;
	}
	h1 {
		text-align: center;
		position: absolute;
		z-index: 1000;
		top: 10vw;
		left: 20vw;
	}

	/*把这一部分拿出main，在最开头做一个占据全宽的intro部分*/
	#main-intro {
		height: auto;
		font-size: 1.1rem;
	}

	#background {
		position: sticky;
		top: 0; /* 使用 0 或者具体像素值 */
		background: linear-gradient(to bottom, #696aab, #b1accf);
		z-index: -1;
		width: 100%;
		/* 设置一个较小的高度，让它能在滚动时展示 sticky 效果 */
		height: 100vh; /* 或者根据需要调整 */
	}

	#main-title {
		position: fixed;
		top: 0;
		z-index: 1000;
	}

	svg,
	svg * {
		outline: none;
	}

	/* #main-sections::before {
		content: "";
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: -1;
		background: linear-gradient(to bottom, #7172ac, #bcb9cf);
		pointer-events: none;
	} */
</style>
