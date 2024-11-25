<script>
	export let options = [];
	export let label = "";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";

	let searchTerm = "";
	let filteredOptions = options.slice(0, 11);
	let isDropdownVisible = false;

	const id = `select-${Math.floor(Math.random() * 1000000)}`;

	function handleSearch(event) {
		searchTerm = event.target.value.toLowerCase();
		filteredOptions = options
			.filter(
				(option) =>
					option.label.toLowerCase().includes(searchTerm) ||
					option.value.toLowerCase().includes(searchTerm)
			)
			.slice(0, 30);
	}

	function selectOption(option) {
		value = option.value;
		searchTerm = option.label || option.value;
		filteredOptions = options.slice(0, 11); // Reset filtered options
		isDropdownVisible = false;
	}

	function handleFocus() {
		isDropdownVisible = true;
	}

	function handleBlur(event) {
		// Use setTimeout to delay hiding dropdown to allow option selection
		setTimeout(() => {
			if (!event.relatedTarget || event.relatedTarget.tagName !== "LI") {
				isDropdownVisible = false;
			}
		}, 100);
	}
</script>

<div class="select">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input
		type="text"
		{id}
		bind:value={searchTerm}
		on:input={handleSearch}
		on:focus={handleFocus}
		on:blur={handleBlur}
		placeholder="🔍 Search..."
		{disabled}
	/>
	{#if isDropdownVisible}
		<ul>
			{#each filteredOptions as option}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<li tabindex="0" on:click={() => selectOption(option)}>
					{option.label || option.value}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.select {
		position: relative;
		width: 100%;
	}

	label {
		display: inline-block;
		font-family: inherit;
		font-weight: inherit;
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	input {
		width: 100%;
		height: 50px;
		font-family: inherit;
		font-size: 1rem;
		cursor: pointer;
		opacity: 0.8;
		outline: 2px dashed #fff6cb;
		color: gold;
		margin-bottom: 1rem;
		background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
		backdrop-filter: blur(50px); /* Blur effect */
		padding-left: 1rem; /* Add padding to make room for the icon */
	}

	input::placeholder {
		color: gold; /* Set the placeholder color */
	}

	input:focus {
		outline: 2px dashed #fff6cb;
		color: #fff6cb;
	}

	input:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}

	ul {
		list-style-type: none;
		background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
		backdrop-filter: blur(50px); /* Blur effect */
		max-height: 200px;
		overflow-y: auto;
		position: absolute;
		width: 100%;
		z-index: 1;
		scroll-snap-type: y mandatory;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		padding-right: 10px;
		border-radius: 8px; /* Optional: rounded corners */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow for better visibility */
	}

	/* Custom scrollbar styles */
	ul::-webkit-scrollbar {
		width: 8px;
		background-color: #f1f1f1;
	}

	ul::-webkit-scrollbar-thumb {
		background-color: gold;
		border-radius: 4px;
	}

	ul::-webkit-scrollbar-thumb:hover {
		background-color: #d4af37;
	}

	li {
		padding: 0.5rem;
		cursor: pointer;
		scroll-snap-align: start;
		box-sizing: border-box;
		font-size: 1rem;
	}

	li:hover {
		outline: 2px dashed gold;
		outline-offset: -2px; /* Ensure outline is within the element */
		border-radius: 2px;
	}
</style>
