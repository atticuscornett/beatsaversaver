<script>
    export let song;
    let hasEasy = false;
    let hasNormal = false;
    let hasHard = false;
    let hasExpert = false;
    let hasExpertPlus = false;

    let songDifficulties = song.versions[0].diffs;

    for (let dif of songDifficulties) {
        if (dif.difficulty === "Easy") {
            hasEasy = true;
        } else if (dif.difficulty === "Normal") {
            hasNormal = true;
        } else if (dif.difficulty === "Hard") {
            hasHard = true;
        } else if (dif.difficulty === "Expert") {
            hasExpert = true;
        } else if (dif.difficulty === "ExpertPlus") {
            hasExpertPlus = true;
        }
    }
</script>

{#if hasEasy}
    <h5 class="easy">Easy</h5>
{/if}

{#if hasNormal}
    <h5 class="normal">Normal</h5>
{/if}

{#if hasHard}
    <h5 class="hard">Hard</h5>
{/if}

{#if hasExpert}
    <h5 class="expert">Expert</h5>
{/if}

{#if hasExpertPlus}
    <h5 class="expertPlus">Expert+</h5>
{/if}

<style>
    h5 {
        margin: 0 0 0 5px;
        padding: 0;
        display: inline;
    }

    .easy {
        color: green;
    }

    .normal {
        color: dodgerblue;
    }

    .hard {
        color: orange;
    }

    .expert {
        color: red;
    }

    .expertPlus {
        color: purple;
    }
</style>