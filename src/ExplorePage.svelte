<script>
    import {onMount} from "svelte";
    import SongResult from "./Components/SongResult.svelte";
    import LevelInfo from "./Components/LevelInfo.svelte";

    let searchResults = false;

    let levelView = false;

    onMount(() => {
        fetch("https://api.beatsaver.com/search/text/0?leaderboard=All&sortOrder=Latest")
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

    function handleEnter(event) {
        if (event.key === "Enter") {
            search();
        }
    }
</script>

<h1>Explore</h1>

{#if levelView === false}
    <input on:keypress={handleEnter} id="searchQuery">
    <button on:click={search}>Search</button>

    <details>
        <summary>Advanced Search</summary>
        <p>Coming soon...</p>
    </details>
{/if}

{#if levelView === false}
    {#if searchResults === false}
        <p>Loading...</p>
    {:else if searchResults.length === 0}
        <p>No results found</p>
    {:else}
        <div id="searchResults">
            {#each searchResults as song}
                <SongResult song={song} bind:levelView={levelView} />
            {/each}
        </div>
    {/if}
{:else}
    <LevelInfo bind:levelView={levelView}></LevelInfo>
{/if}

<style>
    #searchResults {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    button {
        width: calc(25% - 24px);
    }

    #searchQuery {
        width: 75%;
        margin-left: 8px;
    }

    h1 {
        margin-top: 0;
        margin-left: 6px;
    }

    details {
        margin: 8px;
        padding: 8px;
        border-radius: 8px;
        background: #222222;
    }
</style>