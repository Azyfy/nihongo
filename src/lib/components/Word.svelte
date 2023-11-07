<script>
    import Hiragana from "./Hiragana.svelte";

    export let word 
    export let mode = "hiragana"

    $: romajiWord = word ? word.romajiC.split(" ") : ""
</script>

{#if word}
    <div class="word-container" >
        {#if mode === "hiragana"}
            {#each romajiWord  as romaji}
                <Hiragana letter={romaji} dark="dark" />
            {/each}
        {:else if mode === "english"}
            <p>{word.english}</p>
        {:else}
            <p>{word.romaji}</p>
        {/if}
    </div>
{/if}

<style>
    .word-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        color: black;
    }
</style>