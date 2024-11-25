<script>
	import { getContext, onMount, tick, createEventDispatcher } from "svelte";
	import { line, curveLinear } from "d3";
	import { draw, fade } from "svelte/transition";
	import { cubicInOut, cubicOut, cubicIn } from "svelte/easing";
	import Tooltip from "./Tooltip.html.svelte";

	const { data, xGet, xScale, yGet, zGet, width, height } =
		getContext("LayerCake");

	const dispatch = createEventDispatcher();
	export let tooltip = undefined; // 用于存储工具提示事件数据

	let transitionEnabled = false;
	// let previousTooltip = undefined;
	$: matchingYear = (d) => {
		// Return false when tooltip is undefined, so the default style is applied
		return (
			tooltip &&
			typeof tooltip.startYear !== "undefined" &&
			d.startYear === tooltip.startYear
		);
	};

	// 这个响应性块用于检测 tooltip 的变化
	$: if (tooltip === undefined || previousTooltip === undefined) {
		transitionEnabled = true;
	} else {
		transitionEnabled = false;
	}

	// 更新 previousTooltip 以跟踪上一个 tooltip 的值
	$: previousTooltip = tooltip;

	let readyToDraw = false;

	let circlesVisible = new Array($data.length).fill(false); // 默认不显示圆圈

	let secondPathAnimationStarted = new Array($data.length).fill(false);

	async function handleAnimationEnd(i) {
		requestAnimationFrame(() => {
			secondPathAnimationStarted[i] = true;
			circlesVisible[i] = true;
		});
	}

	onMount(async () => {
		await tick(); // 等待Svelte更新DOM

		readyToDraw = true; // 现在设置一个标志，允许路径动画开始
	});
</script>

{#if readyToDraw}
	<g class="projectiles">
		{#each $data as d, i}
			<path
				on:introend={() => handleAnimationEnd(i)}
				class:transition={transitionEnabled}
				in:draw={{
					duration: 600,
					delay: Math.floor(i / 2) * 60,
					easing: cubicOut
				}}
				d="M0,{$height}
                   Q{$xGet(d) / 4},{$yGet(d)} ,{$xGet(d) / 2},{$yGet(d)}"
				fill="none"
				stroke={matchingYear(d) ? $zGet(d) : tooltip ? "gray" : $zGet(d)}
				stroke-width={matchingYear(d) ? 2.5 : 1.5}
				opacity={matchingYear(d) ? 1 : tooltip ? 0.3 : 1}
			/>
			{#if secondPathAnimationStarted[i]}
				<path
					class:transition={transitionEnabled}
					in:draw={{
						duration: 400,

						easing: cubicInOut
					}}
					on:introend={() => handleAnimationEnd(i)}
					d="M{$xGet(d) / 2},{$yGet(d)}
                   Q{($xGet(d) * 3) / 4},{$yGet(d)} ,{$xGet(d)},{$height}"
					fill="none"
					stroke={matchingYear(d) ? $zGet(d) : tooltip ? "gray" : $zGet(d)}
					stroke-width={matchingYear(d) ? 2.5 : 1.5}
					opacity={matchingYear(d) ? 1 : tooltip ? 0.3 : 1}
				/>
			{/if}

			{#if circlesVisible[i]}
				<circle
					class:transition={transitionEnabled}
					cx={$xGet(d)}
					cy={$height}
					r={matchingYear(d) ? 3.5 : 2.5}
					fill={matchingYear(d) ? $zGet(d) : tooltip ? "gray" : $zGet(d)}
					stroke="none"
					opacity={matchingYear(d) ? 1 : tooltip ? 0.3 : 1}
					in:fade={{ duration: 400 }}
				/>
			{/if}
		{/each}
	</g>
{/if}

<style>
	path {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.transition {
		transition: stroke 0.2s ease; /* 仅在 transitionEnabled 为 true 时应用 */
	}
</style>
