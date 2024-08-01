<script>
    import AvailableModes from "./AvailableModes.svelte";
    import {onMount} from "svelte";
    import DownloadSong from "./DownloadSong.svelte";

    export let song;
    export let levelView;

    function songDuration(){
        let duration = song.metadata.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    let songLength;
    $: songLength = songDuration(song.metadata.duration);

    let coverImageURL;
    $: coverImageURL = song.versions[0].coverURL;
    $: refreshURL(coverImageURL);

    let audioURL;
    $: audioURL = song.versions[0].previewURL;


    function refreshURL(){
        if (document.getElementById("coverImage" + song.id) === null){
            setTimeout(refreshURL, 100);
            return;
        }
        let coverImage = document.getElementById("coverImage" + song.id);
        coverImage.style.backgroundImage = `url(${coverImageURL})`;
    }

    onMount(() => {
        refreshURL();
    });

    function moreInfo(){
        levelView = song;
    }

    let paused = true;
</script>

<div class="songResult">
    <div class="imageContainer">
        <div class="coverImage" id={"coverImage" + song.id}>
            <button class="playButton" on:click={() => paused = !paused}>
                <img src={"../src/Images/" + (paused ? "play" : "pause") + "Button.svg"} alt="Play/Pause Button" class="playPauseImage">
            </button>
        </div>
        <h4>Score: {Math.floor(song.stats.score*100)}%</h4>
    </div>
    <div>
        <a href="#" on:click={moreInfo}><h4>{song.name}</h4></a>
        <h5>{song.metadata.songAuthorName}</h5>
        <AvailableModes song={song} />
        <h5>{song.metadata.levelAuthorName}</h5>
    </div>
    <div class="sideDetails">
        <h5>{song.id}</h5>
        <h5>{song.metadata.bpm} bpm</h5>
        <h5>{songLength}</h5>
        <DownloadSong song={song} />
    </div>
</div>

<audio hidden bind:paused={paused} src={audioURL}>
</audio>

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
        min-width: 500px;
        margin: 8px;
        padding: 5px;
        height: auto;
    }

    .imageContainer {
        text-align: center;
    }

    .coverImage {
        background-size: cover;
        background-position: center;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        align-content: center;
    }

    .playPauseImage {
        width: 30px;
    }

    .playButton {
        padding: 0;
        background: none;
        filter: invert(1);
        border: none;
    }

    .sideDetails {
        margin-left: auto;
    }
</style>