<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { getContext } from "svelte";
	import Banner from "$svg/bannerpurple.svg";
	import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";
	const copy = getContext("copy");
	let value;
	let pathElement;

	const progress = tweened(0, {
		duration: 3000,
		easing: cubicInOut
	});

	let cx, cy;

	$: if (pathElement && $progress !== null) {
		const point = pathElement.getPointAtLength(
			$progress * pathElement.getTotalLength()
		);
		cx = point.x;
		cy = point.y;
	}

	$: if (pathElement && value === 0) {
		// 当 value 变成 0 时，开始动画
		progress.set(0.9);
	} else if (value === undefined) {
		// 当 value 是 undefined，重置 progress 和 littlegirl 的位置
		progress.set(0);
	}
</script>

<section>
	<!-- <h2>Scrolly<span>{value}</span></h2> -->
	<div id="section-background" />
	<div class="banner">
		<!-- {@html Banner} -->
		<img src="./images/bannerpng1.png" alt="banner" />

		<div class="headline">
			<h1>
				{@html copy.headline}
			</h1>
			<h3>胡琛浩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;丁杰英</h3>
		</div>
	</div>

	<div class="introstatic">
		{#each Object.values(copy.intro.static1) as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>
</section>

<style>
	.banner {
		height: auto;
	}
	h1 {
		font-size: 3.5rem;
	}
	h2 {
		position: sticky;
		top: 4em;
	}

	.headline {
		position: absolute;
		top: 8%;
		left: 15%;
		font-family: "Shan Zi Gua Zi Chinese";
		min-width: 2rem;
		color: gold;
	}

	img {
		width: 100%; /* 使图片宽度填满容器 */
		height: 100%; /* 使图片高度填满容器 */
		object-fit: cover; /* 确保图片覆盖整个容器，可能会裁剪图片 */
		/* background: linear-gradient(
			to bottom,
			#080c18 10%,
			#262863 40%,
			#696aab 100%
		); */
	}

	section {
		position: relative; /* 使得子元素可以相对于它进行绝对定位 */
		width: 100%; /* 确保占满整个容器的宽度 */
		overflow: hidden; /* 如果有任何溢出的子元素，将被隐藏 */
	}

	#section-background {
		position: absolute; /* 绝对定位相对于其最近的已定位父元素 */
		top: 0;
		left: 0;
		width: 100%; /* 填满父元素的宽度 */
		height: 100%; /* 填满父元素的高度 */
		z-index: -1000;
		background: linear-gradient(
			to bottom,
			#080c18 10%,
			#262863 40%,
			#696aab 100%
		);
	}

	#bannermovingpart {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 98.5vw;
		height: 100vh;
	}

	.spacer {
		height: 85vh;
	}

	.step {
		position: relative;
		border-radius: 20px;
		height: auto;
		text-align: left;
		padding: 20rem 2rem 20rem 2rem; /* 添加padding */
		margin-bottom: 30rem;
		pointer-events: none;
	}

	.step::before {
		content: "";
		position: absolute;
		top: 20rem; /* 视觉上的padding */
		left: 0; /* 视觉上的padding */
		right: 0; /* 视觉上的padding */
		bottom: 20rem; /* 视觉上的padding */
		background: var(--color-gray-600); /* semi-transparent gray */
		border-radius: 20px;
		z-index: 1;
		opacity: 0.75;
	}

	.step > * {
		position: relative;
		z-index: 2;
	}
	.introstatic {
		position: relative;
		max-width: 40rem;
		margin: 0 auto;
		z-index: 2; /* 确保 introstatic 在 banner 之上 */
		transform: translateY(-480px); /* 向上移动 50px，调整此值以满足需求 */
		padding: 16px;
	}
	h3 {
		margin-top: 2rem;
	}
</style>
