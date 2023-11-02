<script>
    import { ModuleStore } from "../stores";

    export let moduleName

    function setModule() {
        ModuleStore.set(moduleName)
    }
</script>

<button on:click={setModule} class="module-button" >
    {moduleName}
</button>

<style>
    .module-button {
        border: 1px solid white;
        padding: 20px 40px;
    }
</style>