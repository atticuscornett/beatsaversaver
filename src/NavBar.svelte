<script>
    /** @type {{navpage: any}} */
    let { navpage = $bindable() } = $props();

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
    <button onclick={explore}><img src="../src/Images/search.svg" alt="Explore"></button>
    <button onclick={downloads}><img src="../src/Images/downloads.svg" alt="Downloads"></button>
    <button onclick={settings}><img src="../src/Images/settings.svg" alt="Settings"></button>
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