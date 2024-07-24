<script>
    import {onMount} from "svelte";
    import SongResult from "./Components/SongResult.svelte";

    let searchResults = false;

    let levelView = false;

    onMount(() => {
        fetch("https://api.beatsaver.com/search/text/0?leaderboard=All&q=cheerleader&sortOrder=Relevance")
            .then(response => response.json())
            .then(data => {
                searchResults = data.docs;
            });
    })

    function search() {
        fetch(`https://api.beatsaver.com/search/text/0?leaderboard=All&q=${document.getElementById("searchQuery").value}&sortOrder=Relevance`)
            .then(response => response.json())
            .then(data => {
                searchResults = data.docs;
            });
    }
</script>

<h1>Explore</h1>

<input id="searchQuery">
<button on:click={search}>Search</button>

{#if searchResults === false}
    <p>Loading...</p>
{:else if searchResults.length === 0}
    <p>No results found</p>
{:else}
    <div id="searchResults">
        {#each searchResults as song}
            <SongResult song={song} />
        {/each}
    </div>
{/if}

<style>
    #searchResults {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>