<script>
    import { ModuleStore } from "../../stores";
    import { IconHome } from "../icons";

    function goHome() {
        ModuleStore.set("Home")
    }
</script>

<div class="nav" >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span on:click={goHome} class="home-icon" >
        <IconHome />
    </span>
</div>

<style>
    .nav {
        position: sticky;
        display: flex;
        justify-content: center;
        align-content: flex-end;
        bottom: 0;
        border-top: 1px solid rgb(205, 205, 205);
        background-color: #242424;
    }

    .home-icon {
        font-size: 1.5625rem;
    }

    .home-icon:hover {
        color: red;
        cursor: pointer;
    }
</style>