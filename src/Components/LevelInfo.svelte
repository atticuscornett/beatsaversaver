<script>
    export let levelView;

    function back() {
        levelView = false;
    }

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
        <h4>{levelView.metadata.levelAuthorName}</h4>
    </div>
</div>

<div class="levelInfo">
    <details>
        <summary>Level Description</summary>
        {#each splitDescription as line}
            <p>{line}</p>
        {/each}
    </details>
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

    .headerTitles {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-left: 10px;
    }

    .levelInfo {
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
</style>