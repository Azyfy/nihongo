<script>
    import { RepeatWordsStore } from "../stores";
    import ModuleButton from "./components/ModuleButton.svelte";
    import CharacterImageLoader from "./components/CharacterImageLoader.svelte";
</script>

<div class="module-btn-container" >
    <CharacterImageLoader />

    <ModuleButton moduleName="Kana Chart" />
    <ModuleButton moduleName="Words" />
    <ModuleButton moduleName="Collections" />
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