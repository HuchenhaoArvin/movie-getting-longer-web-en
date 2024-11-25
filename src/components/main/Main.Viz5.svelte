<script>
	import { LayerCake, Svg, Html } from "layercake";

	import { fade } from "svelte/transition";
	import Tooltip from "../layercake/Tooltip.html.svelte";

	import { format } from "d3-format";

	import { scaleOrdinal, scaleSqrt } from "d3-scale";

	import Select from "$components/helpers/Select.svelte";

	import SpecialScatter from "../layercake/SpecialScatter.svelte";

	export let MoviesFullData;
	export let MoviesNodesData;

	let evt;
	let hideTooltip = true;

	const x = "runtimeMinutes";
	const y = "startYear";
	const r = "ProductionBudget";
	const p = 20;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};

	const formatTickX = (d) => format(".2s")(d);

	// 初始化对象来存储每年的ProductionBudget总和
	const totalBudgetPerYear = {};

	// 计算每年的ProductionBudget总和
	MoviesFullData.forEach((movie) => {
		const year = movie.startYear;
		// 将字符串转换为整数
		const budget = parseInt(movie.ProductionBudget);

		totalBudgetPerYear[year] = (totalBudgetPerYear[year] || 0) + budget;
	});

	// 获取所有年份并按年份排序
	const years = Object.keys(totalBudgetPerYear)
		.map(Number)
		.sort((a, b) => a - b);

	// 初始化累计ProductionBudget
	let cumulativeBudget = 0;

	// 计算每年的累计ProductionBudget
	const cumulativeBudgetPerYear = years.map((year) => {
		cumulativeBudget += totalBudgetPerYear[year];
		return {
			year,
			cumulativeBudget: cumulativeBudget / 1e7
		};
	});

	// 打印累计ProductionBudget
	const manualRange = [
		{ year: 2000, range: 0 },
		{ year: 2001, range: 100 },
		{ year: 2002, range: 200 },
		{ year: 2003, range: 305 },
		{ year: 2004, range: 405 },
		{ year: 2005, range: 515 },
		{ year: 2006, range: 620 },
		{ year: 2007, range: 730 },
		{ year: 2008, range: 830 },
		{ year: 2009, range: 960 },
		{ year: 2010, range: 1080 },
		{ year: 2011, range: 1195 },
		{ year: 2012, range: 1320 },
		{ year: 2013, range: 1445 },
		{ year: 2014, range: 1575 },
		{ year: 2015, range: 1700 },
		{ year: 2016, range: 1820 },
		{ year: 2017, range: 1960 },
		{ year: 2018, range: 2080 },
		{ year: 2019, range: 2195 },
		{ year: 2020, range: 2310 },
		{ year: 2021, range: 2365 },
		{ year: 2022, range: 2440 },
		{ year: 2023, range: 2520 }
	];
	//最后一年的跟整个可视化结束之前还要有一个区间2023-end

	const aaa = cumulativeBudgetPerYear.map((d) => d.cumulativeBudget);

	let directorsSet = new Set();
	// 初始化一个映射来记录每个导演的长电影出现次数
	let directorCounts = new Map();

	MoviesFullData.forEach((d) => {
		if (d.runtimeMinutes >= 120) {
			// 只考虑长电影
			let directorsInRecord = d.directors.split(",");
			directorsInRecord.forEach((director) => {
				let trimmedDirector = director.trim();
				// 如果映射中已经有这个导演，增加计数，否则初始化为1
				if (directorCounts.has(trimmedDirector)) {
					directorCounts.set(
						trimmedDirector,
						directorCounts.get(trimmedDirector) + 1
					);
				} else {
					directorCounts.set(trimmedDirector, 1);
				}
			});
		}
	});
	// 将导演集转换为数组，并按其长电影的出现次数进行排序
	let sortedDirectors = Array.from(directorCounts)
		.sort((a, b) => {
			// a[1], b[1] 是导演长电影出现的次数
			return b[1] - a[1];
		})
		.map((item) => item[0]); // 取排序后的导演名

	let options = [
		{ value: "", label: "..." },
		...sortedDirectors.map((director) => {
			return { value: director, label: director };
		})
	];

	let selectedValue = ""; // 用于绑定选择的值

	$: directorStats = calculateDirectorStats(selectedValue);

	function calculateDirectorStats(director) {
		if (!director) return null;

		let moviesByDirector = MoviesFullData.filter((movie) =>
			movie.directors
				.split(",")
				.map((d) => d.trim())
				.includes(director)
		);
		let totalMovies = moviesByDirector.length;
		let longMovies = moviesByDirector.filter(
			(movie) => movie.runtimeMinutes >= 120
		).length;
		let longMoviesPercentage = ((longMovies / totalMovies) * 100).toFixed(0);
		let budgets = moviesByDirector
			.map((movie) => parseInt(movie.ProductionBudget))
			.filter((budget) => !isNaN(budget));

		let medianBudget = budgets.sort((a, b) => a - b)[
			Math.floor(budgets.length / 2)
		];
		let highestBudget = Math.max(...budgets);
		let lowestBudget = Math.min(...budgets);

		return {
			totalMovies,
			longMovies,
			longMoviesPercentage,
			medianBudget,
			highestBudget,
			lowestBudget
		};
	}

	function formatChineseNumber(num) {
		return (num / 1000000).toFixed(0);
	}
</script>

<section transition:fade={{ duration: 100 }}>
	<div class="select-wrapper">
		<div class="select">
			<div class="legend">
				<svg
					width="200"
					height="150"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 200 150"
				>
					<!-- Adjusted first path -->
					<path
						d="M 371.54885875470603 2228.6742722859735 L 371.54885875470603 2228.6742722859735 L 381.50869061176985 2253.9277636569477 L 406.76218198274427 2263.8875955140115 L 381.50869061176985 2273.8474273710754 L 371.54885875470603 2299.1009187420495 L 361.5890268976422 2273.8474273710754 L 336.3355355266678 2263.8875955140115 L 361.5890268976422 2253.9277636569477 z"
						fill="gold"
						stroke="gold"
						stroke-width="0"
						opacity="0.65"
						class="star s-tfM_gKO7OMX8"
						transform="translate(-336.3355355266678, -2228.6742722859735)"
					/>
					<!-- Text next to the first path -->
					<text x="80" y="20" font-size="14" fill="#fff6cb"
						>A Long Movie
						<tspan x="80" dy="20">With a Budget of</tspan>
						<tspan x="80" dy="20">$400MM</tspan>
					</text>

					<!-- Adjusted second path -->
					<path
						d="M 156.41291307880527 1863.1501297558195 L 156.41291307880527 1863.1501297558195 L 160.82302471095036 1874.3321173280717 L 172.00501228320263 1878.7422289602168 L 160.82302471095036 1883.152340592362 L 156.41291307880527 1894.3343281646141 L 152.0028014466602 1883.152340592362 L 140.82081387440792 1878.7422289602168 L 152.0028014466602 1874.3321173280717 z"
						fill="white"
						stroke="gold"
						stroke-width="0"
						opacity="0.65"
						class="star s-tfM_gKO7OMX8"
						transform="translate(-120.82081387440792, -1773.1501297558195)"
					/>

					<!-- Text next to the second path -->
					<text x="80" y="90" font-size="14" fill="#fff6cb"
						>A Short Movie
						<tspan x="80" dy="20">With a Budget of</tspan>
						<tspan x="80" dy="20"> $73MM</tspan>
					</text>
				</svg>
			</div>
			<Select {options} bind:value={selectedValue} />
			{#if directorStats}
				<div class="director-stats">
					<p>Movie Count: {directorStats.totalMovies}</p>
					<p>
						Long Count: {directorStats.longMovies} ({directorStats.longMoviesPercentage}%)
					</p>

					<p>
						Highest Budget: ${formatChineseNumber(directorStats.highestBudget)} MM
					</p>
					<p>
						Lowest Budget: ${formatChineseNumber(directorStats.lowestBudget)} MM
					</p>
					<p>
						Median Budget: ${formatChineseNumber(directorStats.medianBudget)} MM
					</p>
				</div>
			{/if}
		</div>
	</div>

	<figure>
		<LayerCake
			data={MoviesFullData}
			{x}
			{y}
			{r}
			{padding}
			rScale={scaleSqrt()}
			rRange={[1.5, 18]}
			yScale={scaleOrdinal()}
			yRange={manualRange.map((d) => d.range)}
			yDomain={MoviesFullData.map((d) => d.startYear)}
		>
			<Svg>
				<SpecialScatter
					{manualRange}
					{selectedValue}
					{MoviesNodesData}
					on:mouseover={(event) => (evt = hideTooltip = event)}
					on:mouseout={() => (hideTooltip = true)}
				/>
			</Svg>
			<Html pointerEvents={false}>
				{#if hideTooltip !== true}
					<div in:fade={{ duration: 0, delay: 200 }}>
						<Tooltip {evt} let:detail>
							<div class="row" in:fade={{ duration: 0, delay: 200 }}>
								<div
									class="tooltipTitle"
									style="color: {detail.props.runtimeMinutes > 120
										? 'gold'
										: 'white'};"
								>
									{detail.props.primaryTitle}
								</div>
								<div>Director: {detail.props.directors}</div>
								<div>Year: {detail.props.startYear}</div>
								<div>Runtime: {detail.props.runtimeMinutes} Min</div>
								<div>
									Budget: ${formatChineseNumber(detail.props.ProductionBudget)} MM
								</div>
								<div>
									Gross: ${formatChineseNumber(detail.props.WorldwideGross)} MM
								</div>
							</div>
						</Tooltip>
					</div>
				{/if}
			</Html>
		</LayerCake>
	</figure>
</section>

<style>
	h2 {
		font-size: 2rem;
		font-weight: 600;
	}
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 2626px;
		z-index: 10000;
	}
	.select {
		position: sticky;
		top: 15%;
		left: 0;
		z-index: 10000;
		max-width: 12rem;
		margin-top: 2.3rem;

		pointer-events: all;
	}

	.select-wrapper {
		position: absolute;
		z-index: 1;
		height: 2593px;
		left: -15rem;
		width: 100%;
		pointer-events: none;
	}

	section {
		height: 2826px;
	}

	.director-stats {
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-radius: 8px; /* Optional: rounded corners */
		font-size: 0.85rem;
		background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
		backdrop-filter: blur(50px); /* Blur effect */
	}

	.tooltipTitle {
		margin-bottom: 0.1rem;
		white-space: nowrap;
	}
</style>
