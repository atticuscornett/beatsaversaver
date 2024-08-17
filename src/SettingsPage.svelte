<script>
    import {onMount} from "svelte";

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

    onMount(async () => {
        document.getElementById("customLevelFolder").value = await electronAPI.getCustomLevelFolder();
    });
</script>

<h1>Settings</h1>

<div class="settingsMargin">
    <h2>Beat Saber Custom Level Folder</h2>
    <h5>Typically C:\Program Files\Oculus\Software\Software\hyperbolic-magnetism-beat-saber\Beat Saber_Data\CustomLevels in Meta Quest Link</h5>
    <input on:change={setCustomLevelFolder} id="customLevelFolder">
    <button on:click={selectCustomLevelFolder}>...</button>

    <h2></h2>
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
</style>