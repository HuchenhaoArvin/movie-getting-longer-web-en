<script>
	import { getContext, onMount, createEventDispatcher, tick } from "svelte";
	import {
		scaleLinear,
		extent,
		forceSimulation,
		forceX,
		forceY,
		forceCollide,
		forceManyBody
	} from "d3";
	import { draw } from "svelte/transition";

	const {
		data,
		xGet,
		yGet,
		zGet,
		rGet,
		width,
		height,
		xScale,
		yScale,
		zScale
	} = getContext("LayerCake");

	const dispatch = createEventDispatcher();

	const initialNodes = $data.map((d) => ({ ...d }));

	const simulation = forceSimulation(initialNodes);

	const budgetThreshold = 60000000; // 1亿美元

	let nodes = [];

	let lastYear = null;
	let key = 0; // 新增：用于强制触发重新绘制

	export let manualRange;
	export let selectedValue;
	export let MoviesNodesData;
	let readyToDraw = false;
	onMount(async () => {
		await tick(); // 等待Svelte更新DOM

		readyToDraw = true; // 现在设置一个标志，允许路径动画开始
	});
	// 假设 nodes 是你的数据数组
	$: selectedNodes = nodes
		.filter((node) => selectedValue && node.directors.includes(selectedValue))
		.sort((a, b) => a.startYear - b.startYear);

	$: key = selectedNodes.length > 0 ? Math.random() : key;

	// 函数来获取点的坐标
	function getCoordinates(node) {
		return { x: node.x, y: node.y };
	}

	nodes = initialNodes.map((node, index) => {
		return {
			...node,
			x: parseFloat(MoviesNodesData[index].x),
			y: parseFloat(MoviesNodesData[index].y)
		};
	});
	// simulation.on("tick", () => {
	// 	boundaryForce();
	// 	nodes = simulation.nodes();
	// });

	// requestAnimationFrame(() => {});

	// function boundaryForce() {
	// 	requestAnimationFrame(() => {
	// 		for (let node of nodes) {
	// 			const padding = 1; // 边界内的 10 像素
	// 			// const midLineBuffer = 0; // 中线避免区域的宽度
	// 			const radius = $rGet(node);

	// 			// 正常的边界检查
	// 			node.x = Math.max(
	// 				radius + padding,
	// 				Math.min($width - radius - padding, node.x)
	// 			);
	// 			// }

	// 			// 检查并调整Y坐标
	// 			const yearPosition = $yScale(node.startYear); // 当前年份的Y位置
	// 			let nextYearPosition;

	// 			if (
	// 				node.startYear === "2023" ||
	// 				$yScale((+node.startYear + 1).toString()) === undefined
	// 			) {
	// 				// 如果是最后一年，或者下一年没有对应的y值
	// 				nextYearPosition = $height - padding - radius; // 使用画板底部边界
	// 			} else {
	// 				// 否则，使用下一年份的Y位置
	// 				nextYearPosition =
	// 					$yScale((+node.startYear + 1).toString()) - radius * 0.5;
	// 			}

	// 			node.y = Math.max(
	// 				yearPosition + radius,
	// 				Math.min(nextYearPosition, node.y)
	// 			);
	// 		}
	// 	});
	// }

	// $: {
	// 	requestAnimationFrame(() => {
	// 		simulation
	// 			.force(
	// 				"x",
	// 				forceX((d) => {
	// 					// 首先根据 runtimeMinutes 决定基本位置
	// 					let baseX = d.runtimeMinutes >= 120 ? $width : 0;

	// 					return baseX;
	// 				}).strength(0.1)
	// 			)
	// 			// .force("y", forceY((d) => $yGet(d) + 500).strength(0.1))
	// 			.force(
	// 				"collide",
	// 				forceCollide((d) => $xGet(d))
	// 					.radius((d) => $rGet(d) + 2)
	// 					.strength(1.5)
	// 			)
	// 			// .force("charge", forceManyBody().strength(-30))
	// 			.alpha(1)
	// 			// .alphaDecay(0.01)
	// 			.alphaMin(0.0000000000001)
	// 			// .velocityDecay(0.2)
	// 			// .alphaMin(0)
	// 			// .alphaMin(1)
	// 			.restart();
	// 	});
	// }

	function hollywoodStarPath(
		cx,
		cy,
		spikes,
		outerRadius,
		innerRadius,
		angleRandomness
	) {
		let rot = (Math.PI / 2) * 3;
		let x = cx;
		let y = cy;
		let step = Math.PI / spikes;

		// 应用整体旋转偏移
		let totalRotation = (Math.random() - 0.5) * angleRandomness; // 在 -angleRandomness/2 和 +angleRandomness/2 之间随机选择一个旋转角度
		rot += totalRotation; // 将旋转偏移应用到初始旋转上

		let path =
			"M " +
			(cx + Math.cos(rot) * outerRadius) +
			" " +
			(cy - outerRadius) +
			" ";
		for (let i = 0; i < spikes; i++) {
			x = cx + Math.cos(rot) * outerRadius;
			y = cy + Math.sin(rot) * outerRadius;
			path += `L ${x} ${y} `;
			rot += step;

			x = cx + Math.cos(rot) * innerRadius;
			y = cy + Math.sin(rot) * innerRadius;
			path += `L ${x} ${y} `;
			rot += step;
		}
		path += "z";
		return path;
	}

	// function saveNodesAsCSV() {
	// 	let csvContent = "data:text/csv;charset=utf-8,";
	// 	csvContent += "x,y,year\n"; // 添加表头
	// 	nodes.forEach((node) => {
	// 		csvContent += `${node.x},${node.y},${node.startYear}\n`;
	// 	});

	// 	const encodedUri = encodeURI(csvContent);
	// 	const link = document.createElement("a");
	// 	link.setAttribute("href", encodedUri);
	// 	link.setAttribute("download", "nodes.csv");
	// 	document.body.appendChild(link);

	// 	link.click();

	// 	document.body.removeChild(link);
	// }

	// function handleSVGClick(event) {
	// 	console.log("保存CSV");
	// 	saveNodesAsCSV();
	// }
</script>

<g>
	<defs>
		<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
			<feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="gold" />
		</filter>
	</defs>
	{#if readyToDraw}
		{#each manualRange as d, i}
			<line
				x1="0"
				y1={d.range}
				x2={$width}
				y2={d.range}
				stroke="var(--color-gray-300)"
				stroke-dasharray="4,4"
				z-index="100"
				stroke-width="1.2"
			/>
			{#if i < manualRange.length - 1}
				<text
					x="0"
					y={d.range + (manualRange[i + 1].range - d.range) / 2}
					dx="-2.5rem"
					dy="0.3rem"
					style="text-anchor: start; color: #fff6cb; font-size: 0.925rem; stroke: none; fill: currentColor;"
				>
					{d.year}
				</text>
			{:else}
				<text
					x="0"
					y={d.range + ($height - d.range) / 2}
					dx="-2.5rem"
					dy="0"
					style="text-anchor: start; color: #fff6cb; font-size: 0.925rem; stroke: none; fill: currentColor;"
				>
					{d.year}
				</text>
				<!-- 添加最后一条线 -->
				<line
					x1="0"
					y1={$height}
					x2={$width}
					y2={$height}
					stroke="var(--color-gray-300)"
					stroke-dasharray="4,4"
					z-index="100"
					stroke-width="1.2"
				/>
			{/if}
		{/each}

		{#each nodes as node}
			<path
				d={hollywoodStarPath(
					node.x,
					node.y,
					4,
					$rGet(node),
					$rGet(node) / 2.5,
					0.8
				)}
				fill={node.runtimeMinutes >= 120 ? "gold" : "white"}
				stroke={node.runtimeMinutes >= 120 ? "white" : "gold"}
				filter={selectedValue && node.directors.includes(selectedValue)
					? "url(#shadow)"
					: ""}
				stroke-width={selectedValue && node.directors.includes(selectedValue)
					? 1.2
					: 0}
				opacity={selectedValue && node.directors.includes(selectedValue)
					? 1
					: 0.45}
				on:mouseover={(e) => dispatch("mouseover", { e, props: node })}
				on:focus={(e) => dispatch("mouseover", { e, props: node })}
				on:mouseout={() => dispatch("mouseout")}
				on:blur={() => dispatch("blur")}
				class="star"
			/>
		{/each}
		{#key key}
			{#each selectedNodes as node, index}
				{#if index < selectedNodes.length - 1}
					<line
						x1={node.x}
						y1={node.y}
						x2={selectedNodes[index + 1].x}
						y2={selectedNodes[index + 1].y}
						stroke="#fff6cb"
						stroke-dasharray="5, 5"
						stroke-width="1"
						filter="url(#shadow)"
						in:draw={{ delay: index * 500, duration: 600 }}
					/>
				{/if}
			{/each}
		{/key}
	{/if}
</g>

<!-- <svg on:click={handleSVGClick}>
	<g>
	
		<rect
			x={$width - 100}
			y="0"
			width="100"
			height="30"
			fill="#007bff"
			cursor="pointer"
		/>
		<text
			x={$width - 50}
			y="20"
			text-anchor="middle"
			fill="white"
			cursor="pointer">保存CSV</text
		>
	</g>
</svg> -->

<style>
	.star {
		transition: opacity 2s ease-out; /* 慢速恢复 */
	}
	.star:focus {
		outline: none;
	}

	.star:hover {
		filter: url(#shadow);
		opacity: 1;
		transition: opacity 0s ease-out; /* 瞬间触发 */
	}
</style>
