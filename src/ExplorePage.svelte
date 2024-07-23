<script>
    import {onMount} from "svelte";
    import SongResult from "./Components/SongResult.svelte";

    let searchResults = [];

    onMount(() => {
        fetch("https://api.beatsaver.com/search/text/0?leaderboard=All&q=cheerleader&sortOrder=Relevance")
            .then(response => response.json())
            .then(data => {
                searchResults = data.docs;
            });
    })
</script>

<h1>Explore</h1>
<input>

<div id="results">
    {#each searchResults as song}
        <SongResult song={song} />
    {/each}
</div>

<div id="output">

</div>