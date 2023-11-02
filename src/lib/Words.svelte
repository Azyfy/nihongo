<script>
    import { WordsStore } from "../stores";
    import SearchWord from "./SearchWord.svelte";
    import Word from "./Word.svelte";

    let searchedWord = null

    let index = 0

    let mode = "hiragana"

    function previous() {
       if(index > 0) {
        index -= 1
        resetMode()
       }
    }

    function next() {
        if(index < $WordsStore.length - 1) {
            index += 1
            resetMode()
        }
    }

    function changeMode() {
        mode = mode === "hiragana" ? "english" : "hiragana"
    }

    function resetMode() {
        mode = "hiragana"
    }

    $: currentWord = searchedWord ? searchedWord : $WordsStore[index]
</script>

<div class="words" >
    {#if $WordsStore.length > 0}
        <div class="word-container" >
            <div class="word-card" on:click|self={changeMode} >
                <Word word="{currentWord}" {mode} />
            </div>
        </div>
    {/if}
    
    <div class="slide" >
        <div on:click={previous} class="left" ></div>
        <div on:click={next} class="right" ></div>
    </div>
</div>

<SearchWord bind:word={searchedWord} />


<style>
    .words {
        height: 100%;
        position: relative;
    }

    .word-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .word-card {
        background-color: white;
        position: relative;
        z-index: 10;
        border-radius: 1rem;
        width: 50vw;
        height: 50vw;
        padding: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none;
    }

    .word-card::-webkit-scrollbar {
        width: 0; /* Chrome, Safari */
    }

    .slide {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
       
    }

    .left {
        height: 90%;
        width: 50%;
    }

    .right {
        height: 90%;
        width: 50%;
    }
</style>