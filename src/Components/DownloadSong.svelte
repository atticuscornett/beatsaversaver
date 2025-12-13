<script>
    /** @type {{song: any}} */
    let { song } = $props();

    function checkMods(){
        // Mods - Chroma, Noodle Extensions, Mapping Extensions, Cinema, Any
        let mods = [false, false, false, false];
        mods[0] = song.versions[0].diffs[0].chroma;
        mods[1] = song.versions[0].diffs[0].ne;
        mods[2] = song.versions[0].diffs[0].me;
        mods[3] = song.versions[0].diffs[0].cinema;
        mods[4] = mods[0] || mods[1] || mods[2] || mods[3];
        return mods;
    }

    async function requestDownload() {
        if (songMods[4]) {
            let settings = await electronAPI.getSettings();
            if (settings["modWarnings"]["chroma"] && songMods[0]) {
                modPopup = true;
            } else if (settings["modWarnings"]["ne"] && songMods[1]) {
                modPopup = true;
            } else if (settings["modWarnings"]["me"] && songMods[2]) {
                modPopup = true;
            } else if (settings["modWarnings"]["cinema"] && songMods[3]) {
                modPopup = true;
            } else {
                downloadLevel();
            }
        } else {
            downloadLevel();
        }
    }

    async function downloadLevel(){
        let downloadStarted = await electronAPI.downloadCustomLevel(song.id);
        modPopup = false;
        notify("Download started: " + song.metadata.songName + " (" + song.id + ")");
    }

    let modPopup = $state(false);
    let songMods = $derived(checkMods(song));
    
</script>

<a href="#" onclick={requestDownload}><h5>Download</h5></a>

{#if modPopup}
    <div class="background">
        <div class="modPopup">
            <h2>Mods Required</h2>
            <h3>This level requires the following mods:</h3>
            {#if songMods[0]}
                <h4>Chroma</h4>
            {/if}
            {#if songMods[1]}
                <h4>Noodle Extensions</h4>
            {/if}
            {#if songMods[2]}
                <h4>Mapping Extensions</h4>
            {/if}
            {#if songMods[3]}
                <h4>Cinema</h4>
            {/if}
            <h3>Do you want to download?</h3>
            <h4>
                <a href="#" onclick={downloadLevel}>Yes</a> |
                <a href="#" onclick={() => modPopup = false}>No</a>
            </h4>
            <h6>Tired of this popup? Change your mod warning settings in the settings page.</h6>
        </div>
    </div>
{/if}

<style>
    h5 {
        margin: 5px;
    }

    .modPopup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: black;
        padding: 8px;
        border-radius: 8px;
        z-index: 100;
    }

    .background {
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
</style>