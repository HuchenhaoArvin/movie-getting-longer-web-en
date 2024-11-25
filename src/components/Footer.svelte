<script>
	import { onMount } from "svelte";
</script>

<footer>
	<section class="about">
		<p>Written by: Jieying Ding, Chenhao Hu</p>
		<p>Design: Jieying Ding, Chenhao Hu</p>
		<p>Data Analysis: Chenhao Hu, Jieying Ding</p>
		<p>Coding & Development: Chenhao Hu</p>
	</section>

	<section class="methodology">
		<h4>About the Data</h4>
		<p>
			The data for this project mainly comes from <a
				href="https://developer.imdb.com/non-commercial-datasets/"
				>the IMDb Non-Commercial Datasets</a
			>
			and
			<a href="https://www.the-numbers.com/movie/budgets/all"
				>The Numbers budget and gross dataset</a
			>. We cleaned the IMDb data and selected entries where the type is "movie"
			and the values for "startYear", "runtimeMinutes", "averageRating", and
			"numVotes" are not empty.
		</p>
		<p>
			Since IMDb's free database does not provide gross and budget data, we
			obtained relevant data from The Numbers website and limited our discussion
			to "popular movies" that have gross and budget data available on The
			Numbers website.
		</p>
	</section>
	<section class="reference">
		<h4>References</h4>
		<p>[1] 吉尔·利波维茨基,让·塞鲁瓦,李宁玥-《总体屏幕:从电影到智能手机》</p>
		<p>
			[2] James E. Cutting - Movies on Our Minds: The Evolution of Cinematic
			Engagement
		</p>
		<p>[3] James E. Cutting - The evolution of pace in popular movies</p>
		<p>
			[4] Bloomberg - Last Year Was Brutal for Hollywood. Will 2023 Be Any
			Better?<br
			/>https://www.bloomberg.com/news/newsletters/2023-01-02/last-year-was-brutal-for-hollywood-will-2023-be-any-better
		</p>
		<p>
			[5] Variety - Why Are Movies So Long Now?<br
			/>https://variety.com/2022/film/features/batman-spider-man-long-movie-runtimes-1235187797/
		</p>
		<p>
			[6] Cleveland clinic-How Often Should You Pee During the Day?<br
			/>https://health.clevelandclinic.org/how-often-should-you-pee
		</p>
		<p>
			[7] Morning consult - Gen Z Wants Shorter TV Episodes and Movies<br
			/>https://pro.morningconsult.com/instant-intel/gen-z-prefers-shorter-tv-episodes-and-movies
		</p>
		<p>
			[8] The economist-Hollywood is losing the battle for china<br
			/>https://www.economist.com/interactive/2023/04/29/hollywood-is-losing-the-battle-for-china
		</p>
		<p>
			[9] 向帆 - 正是这样一个模模糊糊的画面，才可以让人看到高精度的事实<br
			/>https://mp.weixin.qq.com/s/-B36po9yu19mlU3kj5QrIg
		</p>
		<p>
			[10] The Guardian - Are films really getting longer? We ask the expert<br
			/>https://www.theguardian.com/lifeandstyle/2022/jan/07/are-films-really-getting-longer-we-ask-the-expert
		</p>
		<p>
			[11] CNN - Why it feels like movies are getting longer<br
			/>https://edition.cnn.com/2022/02/06/entertainment/movie-runtimes-longer-mcu-batman-oscar-bait-cec/index.html
		</p>
		<p>
			[12] Dr. Randal S. Olson - Movies aren't actually much longer than they
			used to be<br
			/>https://randalolson.com/2014/01/25/movies-arent-actually-much-longer-than-they-used-to-be/
		</p>
		<p>
			[13] Los Angeles Times - Are movies too long? Hollywood tests the limits
			of our pandemic attention spans<br
			/>https://www.latimes.com/entertainment-arts/business/newsletter/2021-11-30/wide-shot-are-movies-too-long-house-of-gucci-last-duel-no-time-to-die-the-wide-shot
		</p>
		<p>
			[14] The review geek - Is the movie industry dying? What 2022’s damning
			box office can tell us about the industry’s future<br
			/>https://www.thereviewgeek.com/is-the-movie-industry-dying/
		</p>
	</section>

	<section class="copyright">
		<p>
			This project was initially developed using <a
				href="https://github.com/the-pudding/svelte-starter"
				>The Pudding's Svelte open-source starter</a
			>. We extend our heartfelt thanks.
		</p>
		<p>
			For feedback, discussion, collaboration, or inquiries, please contact us
			via email at djy20182019@gmail.com and hantaclaymail@gmail.com.
		</p>
		<p>© 2024 Chenhao Hu, Jieying Ding</p>
	</section>
</footer>

<style>
	footer {
		color: #fff6cb;
		background: rgba(150, 150, 150, 0.2);
		padding: 5rem 2rem;
		margin-top: 0;
		font-size: 0.9rem;
		text-align: left;
	}

	.about {
		margin: 0 auto;
		margin-top: 2rem;
		text-align: left;
		max-width: 35%;
	}
	.methodology {
		margin: 0 auto;
		margin-top: 4rem;
		text-align: left;
		max-width: 35%;
	}
	.reference {
		margin: 0 auto;
		margin-top: 4rem;
		text-align: left;
		max-width: 35%;
		font-size: 0.9rem;
	}
	.copyright {
		margin: 0 auto;
		margin-top: 4rem;
		text-align: left;
		max-width: 35%;
		font-size: 0.9rem;
	}
	h4 {
		font-size: 1.4rem;
		font-weight: 500;
		margin-bottom: 1.2rem;
	}
</style>
