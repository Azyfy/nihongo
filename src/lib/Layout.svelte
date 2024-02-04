<script>
    import { RepeatWordsStore, ModuleStore, WordsStore } from "../stores";
    import KanaChart from "./KanaChart.svelte";
    import Home from "./Home.svelte";
    import Words from "./Words.svelte";
    import Collections from "./Collections.svelte"
    import CurrentCollectionStore from "../stores/CurrentCollectionStore";
</script>


{#if $ModuleStore === "Home"}
    <Home />
{:else if $ModuleStore === "Kana Chart" || $ModuleStore === "Hiragana" || $ModuleStore === "Katakana"}
    <KanaChart />
{:else if $ModuleStore === "Words"}
    <Words words={$WordsStore} />
{:else if $ModuleStore === "Collections"}
    <Collections />
{:else if $ModuleStore === "Collection"}
    <Words words={$CurrentCollectionStore.words} moduleName={$ModuleStore} />
{:else if $ModuleStore === "Repeat Words"}
    <Words words={$RepeatWordsStore} moduleName={$ModuleStore} />
{:else}
    <Home />
{/if}


