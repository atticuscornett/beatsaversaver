<script>
    import {onMount} from "svelte";

    let settings = {
        "modWarnings": {
            "chroma": false,
            "ne": false,
            "me": false,
            "cinema": false
        }
    }

    function setCustomLevelFolder(){
        electronAPI.setCustomLevelFolder(document.getElementById("customLevelFolder").value);
    }

    async function selectCustomLevelFolder(){
        let folder = await electronAPI.selectFolder();
        if (folder){
            document.getElementById("customLevelFolder").value = folder;
            electronAPI.setCustomLevelFolder(folder);
        }
    }

    async function saveSettings(){
        await electronAPI.setSettings(settings);
    }

    onMount(async () => {
        document.getElementById("customLevelFolder").value = await electronAPI.getCustomLevelFolder();
        settings = await electronAPI.getSettings();
    });
</script>

<h1>Settings</h1>

<div class="settingsMargin" on:change={saveSettings}>
    <h2>Beat Saber Custom Level Folder</h2>
    <h5>Typically C:\Program Files\Oculus\Software\Software\hyperbolic-magnetism-beat-saber\Beat Saber_Data\CustomLevels in Meta Quest Link</h5>
    <input on:change={setCustomLevelFolder} id="customLevelFolder">
    <button on:click={selectCustomLevelFolder}>...</button>

    <h2>Mod Warnings</h2>
    <h5>BeatSaverSaver will show a popup if a mod is required for a level you are downloading.</h5>

    <input type="checkbox" id="chromaWarning" bind:checked={settings["modWarnings"]["chroma"]}>
    <label for="chromaWarning">Warn me if a level requires Chroma</label>
    <br>

    <input type="checkbox" id="neWarning" bind:checked={settings["modWarnings"]["ne"]}>
    <label for="neWarning">Warn me if a level requires Noodle Extensions</label>

    <br>
    <input type="checkbox" id="meWarning" bind:checked={settings["modWarnings"]["me"]}>
    <label for="meWarning">Warn me if a level requires Mapping Extensions</label>

    <br>
    <input type="checkbox" id="cinemaWarning" bind:checked={settings["modWarnings"]["cinema"]}>
    <label for="cinemaWarning">Warn me if a level requires Cinema</label>
</div>


<style>
    h1 {
        margin-top: 0;
        margin-left: 8px;
    }

    #customLevelFolder {
        width: 75%;
    }

    .settingsMargin {
        margin: 8px;
    }

    label {
        display: inline;
    }
</style>