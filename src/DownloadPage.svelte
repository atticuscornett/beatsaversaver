<h1>Downloads</h1>

<script>
    import {onMount} from "svelte";
    import ScannedSong from "./Components/ScannedSong.svelte";

    let downloadedLevels;

    onMount(async () =>{
        downloadedLevels = await electronAPI.scanCustomLevels();
    })
</script>

<div id="downloadList">
    {#if downloadedLevels}
        {#each downloadedLevels as level}
            <ScannedSong song={level} bind:downloadedSongs={downloadedLevels}/>
        {/each}
    {:else}
        <h2>Scanning downloaded levels...</h2>
    {/if}
</div>

<div class="appMargin">
    {#if downloadedLevels}
        {#if downloadedLevels.length === 0}
            <h2>No downloaded levels found.</h2>
            <h4>Think this is an error? Check your custom level folder setting.</h4>
        {/if}
    {/if}
</div>

<style>
    #downloadList {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .appMargin {
        margin: 8px;
    }

    h1 {
        margin-top: 0;
        margin-left: 8px;
    }
</style>