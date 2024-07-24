<script>
    export let levelView;

    function back() {
        levelView = false;
    }

    function songDuration(){
        let duration = levelView.metadata.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    function checkMods(){
        // Mods - Chroma, Noodle Extensions, Mapping Extensions, Cinema, Any
        let mods = [false, false, false, false];
        mods[0] = levelView.versions[0].diffs[0].chroma;
        mods[1] = levelView.versions[0].diffs[0].ne;
        mods[2] = levelView.versions[0].diffs[0].me;
        mods[3] = levelView.versions[0].diffs[0].cinema;
        mods[4] = mods[0] || mods[1] || mods[2] || mods[3];
        return mods;
    }

    let modList = checkMods();

    let splitDescription = levelView.description.split("\n");
</script>

<button on:click={back}>&lt; Back</button>

<div class="header">
    <div class="headerImages">
        <img class="levelImage" src={levelView.versions[0].coverURL} alt="Song Cover">
<!--        <h4>Score: {Math.floor(levelView.stats.score*100)}%</h4>-->
    </div>
    <div class="headerTitles">
        <h2>{levelView.name}</h2>
        <h3>{levelView.metadata.songName} - {levelView.metadata.songAuthorName}</h3>
        <h4>Mappers: {levelView.metadata.levelAuthorName}</h4>
    </div>
</div>

<div class="levelDetails">
    <details>
        <summary>Level Description</summary>
        {#each splitDescription as line}
            <p>{line}</p>
        {/each}
    </details>

    <div class="levelInfo">
        <h3>Level Info</h3>
        <div class="levelInfoFlex">
            <div class="levelInfoSpace">
                <h4>Metadata</h4>
                <h5>Level ID: {levelView.id}</h5>
                <h5>BPM: {levelView.metadata.bpm}</h5>
                <h5>Song Length: {songDuration()}</h5>
            </div>

            {#if levelView.tags}
                <div class="levelInfoSpace">
                    <h4>Tags</h4>
                    {#each levelView.tags as tag}
                        <h5>{tag}</h5>
                    {/each}
                </div>
            {/if}

            <div class="levelInfoSpace">
                <h4>Mods</h4>

                {#if modList[0]}
                    <h5>Chroma</h5>
                {/if}

                {#if modList[1]}
                    <h5>Noodle Extensions</h5>
                {/if}

                {#if modList[2]}
                    <h5>Mapping Extensions</h5>
                {/if}

                {#if modList[3]}
                    <h5>Cinema</h5>
                {/if}

                {#if !modList[4]}
                    <h5>None</h5>
                {/if}
            </div>
        </div>
    </div>

    <div class="levelInfo">
        <h3>Community Stats</h3>
        <div class="levelInfoFlex">
            <div class="levelInfoSpace">
                <h4>Popularity</h4>
                <h5>Plays: {levelView.stats.plays}</h5>
                <h5>Downloads: {levelView.stats.downloads}</h5>
            </div>

            <div class="levelInfoSpace">
                <h4>Votes</h4>
                <h5>Upvotes: {levelView.stats.upvotes}</h5>
                <h5>Downvotes: {levelView.stats.downvotes}</h5>
            </div>

            <div class="levelInfoSpace">
                <h4>Ratings</h4>
                <h5>Score: {Math.round(levelView.stats.score*100)}%</h5>
                <h5>Review: {levelView.stats.reviews}</h5>
            </div>
        </div>
    </div>
</div>

<style>
    .header {
        display: flex;
        direction: ltr;
        flex: 1 1 10px;
        margin: 8px;
        padding: 5px;
        background: #222222;
        border-radius: 8px;
    }

    .levelImage {
        height: 150px;
        border-radius: 5px;
    }

    h1, h2, h3, h4, h5, p {
        margin: 5px;
    }

    h5 {
        font-weight: normal;
    }

    .headerTitles {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-left: 10px;
    }

    .levelDetails {
        margin: 8px;
    }

    details {
        padding: 5px;
        background: #222222;
        border-radius: 8px;
        font-size: 15px;
    }

    summary {
        font-weight: bold;
        font-size: 24px;
        padding: 8px;
        cursor: pointer;
    }

    .levelInfo {
        padding: 15px;
        background: #222222;
        border-radius: 8px;
        margin-top: 8px;
    }

    .levelInfoFlex {
        display: flex;
    }

    .levelInfoSpace {
        margin-right: 100px;
    }
</style>