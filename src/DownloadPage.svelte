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
            <ScannedSong song={level}/>
        {/each}
    {:else}
        <h1>Scanning downloaded levels...</h1>
    {/if}
</div>

<style>
    #downloadList {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>