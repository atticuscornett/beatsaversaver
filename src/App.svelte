<script>
	import NavBar from "./NavBar.svelte";

	export let name;
	let page = "explore";
</script>

<main>
	<div class="appcontainer">
		<div style="padding: 15px;">
			{#each Array(100) as i}
				<p>Scroll me!</p>
			{/each}
			<h1>You are on {page}</h1>
			<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
		</div>
	</div>
	<NavBar bind:navpage={page} />
</main>

<style>
	.appcontainer {
		height: 90vh;
		margin: 0;
		padding: 0;
		overflow: auto;
	}

	:global(body){
		padding: 0;
	}
</style>