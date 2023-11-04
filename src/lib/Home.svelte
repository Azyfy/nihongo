<script>
  import { RepeatWordsStore } from "../stores";
    import ModuleButton from "./ModuleButton.svelte";

</script>

<div class="module-btn-container" >
    <ModuleButton moduleName="Hiragana Chart" />
    <ModuleButton moduleName="Words" />
    {#if $RepeatWordsStore.length > 0 }
        <ModuleButton moduleName="Repeat Words" />
    {/if}
</div>

<style>
    .module-btn-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.25rem;
        height: 100%;
    }
</style>