<script>
	import NavBar from "./NavBar.svelte";
	import ExplorePage from "./ExplorePage.svelte";
	import DownloadPage from "./DownloadPage.svelte";
	import SettingsPage from "./SettingsPage.svelte";
	import Notification from "./Components/Notification.svelte";
	import {fade} from "svelte/transition";

	let page = "explore";

	let notifications = [];

	function addNotification (notification) {
		for (let i = 0; i < notifications.length; i++) {
			if (notifications[i] === "") {
				// Clear empty notifications
				notifications.slice(i, 1);
			}
		}
		notifications = [...notifications, notification];
		console.log(notifications)
	}

	electronAPI.onNotify((e, message) => {
		addNotification(message.message);
	});

	window.notify = addNotification;
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

			<div class="notifications">
				{#each notifications as notifText}
					{#if notifText !== ""}
						<div transition:fade|global>
							<Notification bind:notification={notifText} />
						</div>
					{/if}
				{/each}
			</div>
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

	.notifications {
		position: fixed;
		bottom: 10vh;
		padding: 10px;
		z-index: 999;
		width: 100%;
	}

	@font-face {
		font-family: Lexend;
		src: url("../../src/lexend.ttf");
	}

	:global(body){
		font-family: Lexend, sans-serif;
		padding: 0;
		background-color: #070707;
		color: white;
	}
</style>