<script>
	import NavBar from "./NavBar.svelte";
	import ExplorePage from "./ExplorePage.svelte";
	import DownloadPage from "./DownloadPage.svelte";
	import SettingsPage from "./SettingsPage.svelte";

	export let name;
	let page = "explore";
</script>

<main>
	<div class="appContainer">
		<div class="appMargin">
			{#if page === "explore"}
				<ExplorePage/>
			{:else if page === "downloads"}
				<DownloadPage/>
			{:else if page === "settings"}
				<SettingsPage/>
			{/if}

		</div>
	</div>
	<NavBar bind:navpage={page} />
</main>

<style>
	.appContainer {
		height: 90vh;
		margin: 0;
		padding: 0;
		overflow: auto;
	}

	.appMargin {
		padding: 15px;
	}

	:global(body){
		padding: 0;
		background-color: #070707;
		color: white;
	}
</style>