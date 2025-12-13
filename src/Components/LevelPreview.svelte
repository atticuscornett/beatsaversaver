<script>
    /** @type {{levelId: any, show: any}} */
    let { levelId, show = $bindable() } = $props();

    function close(){
        show = false;
    }

    function preventClose(event){
        event.stopPropagation();
    }
</script>

<div class="background" onclick={close}>
    <div onclick={preventClose}>
        <button onclick={close}>x</button>
        <iframe src="https://allpoland.github.io/ArcViewer/?id={levelId}" title="Level Preview"></iframe>
    </div>
</div>

<style>
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

    iframe {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
    }

    button {
        position: fixed;
        top: 0;
        right: 0;
        margin: 5px;
        padding: 5px;
        background: white;
        color: black;
        border: 0;
        width: 25px;
        height: 25px;
        line-height: 12px;
        text-align: center;
        border-radius: 50%;
    }
</style>