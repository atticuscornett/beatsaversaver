<script>
    import {onMount} from "svelte";

    export let notification;

    onMount(() => {
        setTimeout(() => {
            notification = "";
        }, 7000);
    })

    let notificationText = notification;
</script>

<div>
    <h4>{notificationText}</h4>
</div>


<style>
    div {
        margin-left: auto;
        margin-right: auto;
        background-color: #222222;
        border-radius: 7px;
        padding: 5px;
        border: #333333 solid 3px;
        width: fit-content;
        min-width: 400px;
        text-align: center;
        margin-bottom: 10px;
        max-width: 60vw;
    }

    h4 {
        margin: 3px;
    }

    button {
        float: right;
    }
</style>