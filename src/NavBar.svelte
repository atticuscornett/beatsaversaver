<script>
    export let navpage;

    function explore() {
        console.log("explore")
        navpage = "explore";
    }

    function downloads() {
        console.log("downloads")
        navpage = "downloads";
    }

    function settings() {
        console.log("settings")
        navpage = "settings";
    }
</script>

<div>
    <button on:click={explore}>Explore</button>
    <button on:click={downloads}>Downloads</button>
    <button on:click={settings}>Settings</button>
</div>

<style>
    div {
        height: 10vh;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    button {
        height: 100%;
        width: 33.33%;
        background-color: #f1f1f1;
        border: none;
        float: left;
    }

</style>