<script>
    import Kana from "./Kana.svelte";

    export let word 
    export let mode = "hiragana"

    $: romajiWord = word ? word.romajiC.split(" ") : ""
</script>

{#if word}
    <div class="word-container" >
        {#if mode === "hiragana" || mode === "katakana"}
            {#each romajiWord  as romaji}
                <Kana letter={romaji} kana={mode} dark="dark" />
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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        color: black;
    }
</style>