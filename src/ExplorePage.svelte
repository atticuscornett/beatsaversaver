<script>
    import { run } from 'svelte/legacy';

    import {onMount} from "svelte";
    import SongResult from "./Components/SongResult.svelte";
    import LevelInfo from "./Components/LevelInfo.svelte";

    let searchResults = $state(false);

    let levelView = $state(false);

    let minNPS = $state(0);
    let maxNPS = $state(20);

    run(() => {
        if (minNPS >= maxNPS) {
            minNPS = maxNPS - 1;
            if (minNPS < 0) {
                minNPS = 0;
                maxNPS = 1;
            }
        }
    });

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

    function checkBoxCycle(event){
        let checkbox = event.target;
        if (!checkbox.checked && !checkbox.indeterminate && checkbox.tagName === "INPUT") {
            checkbox.indeterminate = true;
            checkbox.wasIndeterminate = true;
            console.log("cheese")
        }
        else if (checkbox.wasIndeterminate && checkbox.tagName === "INPUT") {
            checkbox.wasIndeterminate = false;
            checkbox.checked = false;
        }
    }

    function advancedSearch(){
        let link = "https://api.beatsaver.com/search/text/0?";

        link += `q=${document.getElementById("searchQuery").value}&`;

        let curated = document.getElementById("curatedFilter");
        if (curated.indeterminate) {
            link += "curated=false&";
        }
        else if (curated.checked){
            link += "curated=true&";
        }

        let verifiedCreator = document.getElementById("verifiedCreatorFilter");
        if (verifiedCreator.indeterminate) {
            link += "verified=false&";
        }
        else if (verifiedCreator.checked){
            link += "verified=true&";
        }

        let fullSpread = document.getElementById("fullSpreadFilter");
        if (fullSpread.indeterminate) {
            link += "fullSpread=false&";
        }
        else if (fullSpread.checked){
            link += "fullSpread=true&";
        }

        let chroma = document.getElementById("chromaFilter");
        if (chroma.indeterminate) {
            link += "chroma=false&";
        }
        else if (chroma.checked){
            link += "chroma=true&";
        }

        let ne = document.getElementById("neFilter");
        if (ne.indeterminate) {
            link += "noodle=false&";
        }
        else if (ne.checked){
            link += "noodle=true&";
        }

        let me = document.getElementById("meFilter");
        if (me.indeterminate) {
            link += "me=false&";
        }
        else if (me.checked){
            link += "me=true&";
        }

        let cinema = document.getElementById("cinemaFilter");
        if (cinema.indeterminate) {
            link += "cinema=false&";
        }
        else if (cinema.checked){
            link += "cinema=true&";
        }

        let minNPS = document.getElementById("minNPS").value;
        link += `minNps=${minNPS}&`;

        let maxNPS = document.getElementById("maxNPS").value;
        link += `maxNps=${maxNPS}&`;

        let leaderboard = document.getElementById("leaderboardFilter").value;
        link += `leaderboard=${leaderboard}&`;

        let sort = document.getElementById("sortFilter").value;
        link += `sortOrder=${sort}`;

        fetch(link)
            .then(response => response.json())
            .then(data => {
                searchResults = data.docs;
            });
    }
</script>

<h1>Explore</h1>

{#if levelView === false}
    <input onkeypress={handleEnter} id="searchQuery">
    <button onclick={search}>Search</button>

    <details>
        <summary>Advanced Search</summary>
        <div class="advancedFlex">
            <div class="filterSection" onchange={checkBoxCycle}>
                <h4>General</h4>
                <input type="checkbox" id="curatedFilter">
                <label for="curatedFilter">Curated</label>
                <br>
                <input type="checkbox" id="verifiedCreatorFilter">
                <label for="verifiedCreatorFilter">Verified Creator</label>
                <br>
                <input type="checkbox" id="fullSpreadFilter">
                <label for="fullSpreadFilter">Full Spread</label>
            </div>
            <div class="filterSection" onchange={checkBoxCycle}>
                <h4>Mods</h4>
                <input type="checkbox" id="chromaFilter">
                <label for="chromaFilter">Chroma</label>
                <br>
                <input type="checkbox" id="neFilter">
                <label for="neFilter">Noodle Extensions</label>
                <br>
                <input type="checkbox" id="meFilter">
                <label for="meFilter">Mapping Extensions</label>
                <br>
                <input type="checkbox" id="cinemaFilter">
                <label for="cinemaFilter">Cinema</label>
            </div>
            <div class="filterSection">
                <h4>Speed</h4>
                <label for="minNPS">Minimum NPS ({minNPS} NPS)</label>
                <br>
                <input id="minNPS" type="range" min="0" max="20" bind:value={minNPS}>
                <br>
                <label for="maxNPS">Maximum NPS ({maxNPS} NPS)</label>
                <br>
                <input id="maxNPS" type="range" min="0" max="20" bind:value={maxNPS}>
            </div>
            <div class="filterSection">
                <h4>Miscellaneous</h4>
                <label for="leaderboardFilter">Leaderboard</label>
                <br>
                <select id="leaderboardFilter">
                    <option value="All">All</option>
                    <option value="Ranked">Ranked</option>
                    <option value="BeatLeader">BeatLeader</option>
                    <option value="ScoreSaber">ScoreSaber</option>
                </select>
                <br>
                <label for="sortFilter">Sort By</label>
                <br>
                <select id="sortFilter">
                    <option value="Relevance">Relevance</option>
                    <option value="Latest">Latest</option>
                    <option value="Rating">Rating</option>
                    <option value="Curated">Curated</option>
                </select>
            </div>
        </div>
        <br>
        <button class="filterButton" onclick={advancedSearch}>Search</button>
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
        align-items: stretch;
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

    input[type="checkbox"] {
        margin: 4px;
    }

    label {
        display: inline;
    }

    .filterButton {
        margin-top: 8px;
        background-color: hsl(226, 70%, 44%);
        padding: 5px;
        border: 0;
        width: fit-content;
        color: white;
    }

    .advancedFlex {
        display: flex;
    }

    .filterSection {
        margin-right: 15px;
    }

    select {
        font-size: 15px;
        padding: 2px;
    }
</style>