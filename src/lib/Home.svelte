<script>
    import ModuleButton from "./ModuleButton.svelte";

</script>

<div class="module-btn-container" >
    <ModuleButton moduleName="Hiragana Chart" />
    <ModuleButton moduleName="Words" />
</div>

<style>
    .module-btn-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        height: 100%;
    }
</style>