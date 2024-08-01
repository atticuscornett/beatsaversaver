<script>
    export let song;

    async function requestDownload(){
        let downloadStarted = await electronAPI.downloadCustomLevel(song.id);
        notify("Download started: " + song.metadata.songName + " (" + song.id + ")");
    }
</script>

<a href="#" on:click={requestDownload}><h5>Download</h5></a>

<style>
    h5 {
        margin: 5px;
    }
</style>