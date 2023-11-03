<script>
    import { ModuleStore, WordsStore } from "../stores";
    import HiraganaChart from "./HiraganaChart.svelte";
    import Home from "./Home.svelte";
    import Words from "./Words.svelte";

</script>


{#if $ModuleStore === "Home" }
    <Home />
{:else if $ModuleStore === "Hiragana Chart"}
    <HiraganaChart />
{:else if $ModuleStore === "Words"}
    <Words words={$WordsStore} />
{:else}
    <Home />
{/if}


