<script>
    import AvailableModes from "./AvailableModes.svelte";

    export let song;

    function songDuration(){
        let duration = song.metadata.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    async function requestDownload(){
        let downloadStarted = await electronAPI.downloadCustomLevel(song.id);
        console.log("Download started: ", downloadStarted);
    }
</script>

<div class="songResult">
    <div class="imageContainer">
        <img class="albumCover" src="{song.versions[0].coverURL}" alt="Song Cover">
        <h4>Score: {Math.floor(song.stats.score*100)}%</h4>
    </div>
    <div>
        <h4>{song.name}</h4>
        <h5>{song.metadata.songAuthorName}</h5>
        <AvailableModes song={song} />
        <h5>{song.metadata.levelAuthorName}</h5>
    </div>
    <div class="sideDetails">
        <h5>{song.id}</h5>
        <h5>{song.metadata.bpm} bpm</h5>
        <h5>{songDuration()}</h5>
        <a href="#" on:click={requestDownload}><h5>Download</h5></a>
    </div>
</div>

<style>
    div {
        background: #222222;
        border-radius: 10px;

    }

    h3, h4, h5 {
        margin: 5px;
    }

    .songResult {
        display: flex;
        direction: ltr;
        flex: 1 1 10px;
        min-width: 600px;
        margin: 8px;
        padding: 5px;
    }

    .albumCover {
        height: 100px;
        border-radius: 8px;
    }

    .imageContainer {
        text-align: center;
    }

    .sideDetails {
        margin-left: auto;
    }
</style>