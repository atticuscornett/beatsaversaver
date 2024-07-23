<script>
    export let song;
</script>

<div class="songResult">
    <div class="imageContainer">
        <img class="albumCover" src="{song.fullImagePath}" alt="Song Cover">
    </div>
    <div>
        <h4>{song._songName}</h4>
        <h5>{song._songAuthorName}</h5>
        <h5>{song._levelAuthorName}</h5>
    </div>
    <div class="sideDetails">
        <h5>{Math.round(song._beatsPerMinute)} bpm</h5>
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