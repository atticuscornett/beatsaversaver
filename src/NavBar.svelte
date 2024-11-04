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
    <button on:click={explore}><img src="../src/Images/search.svg" alt="Explore"></button>
    <button on:click={downloads}><img src="../src/Images/downloads.svg" alt="Downloads"></button>
    <button on:click={settings}><img src="../src/Images/settings.svg" alt="Settings"></button>
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
        background-color: #111111;
        border: none;
        float: left;
    }

    img {
        height: 55%;
    }

</style>