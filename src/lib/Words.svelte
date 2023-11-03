<script>
    import { WordsStore } from "../stores";
    import SearchWord from "./SearchWord.svelte";
    import Word from "./Word.svelte";
    import { IconEye, IconEyeSlash, IconSwap } from "./icons";

    let searchedWord = null

    let index = 0
    $: currentPosition = index + 1

    let japaneseMode = "hiragana"
    let mode = japaneseMode
    let modeOption = mode

    $: currentWord = searchedWord ? searchedWord : $WordsStore[index]

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
        mode = mode === "english" ? japaneseMode : "english"
    }

    function swapMode() {
        modeOption = modeOption === "english" ? japaneseMode : "english"
        mode = modeOption
    }

    function swapRomajiMode() {
        modeOption = modeOption === "romaji" ? "hiragana" : "romaji"
        japaneseMode = modeOption
        mode = modeOption
    }

    function resetMode() {
        mode = modeOption
    }

    function selectPage(e) {
        const value = Number(e.target.value)

        if(!isNaN(value)) {
            if(value < 1) {
                index = 0
            }
            else if(value > $WordsStore.length) {
                index = $WordsStore.length - 1
            }
            else {
                index = value - 1
            }
        }
    }
</script>

<div class="words-component" >
    <div class="mode-options over" >
        <span class="mode-icon" on:click={swapRomajiMode} >
            {#if japaneseMode === "romaji"}
                <IconEyeSlash></IconEyeSlash>
            {:else}
                <IconEye></IconEye>
            {/if}
        </span>
        <span class="mode-icon" on:click={swapMode} ><IconSwap /></span>
    </div>

    <div class="words over" >
        {#if $WordsStore.length > 0}
            <div class="word-container" >
                <div class="word-card" on:click|self={changeMode} >
                    <Word word="{currentWord}" {mode} />
                </div>
            </div>
        {/if}
    </div>

    <div class="pages over" > <input class="page-input" bind:value={currentPosition} on:input={selectPage} /> / {$WordsStore.length} </div>

    <div class="over" >
        <SearchWord bind:word={searchedWord} />
    </div>


    <div class="slide" >
        <div on:click={previous} class="left" ></div>
        <div on:click={next} class="right" ></div>
    </div>
</div>


<style>
    .words-component {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        height: 100%;
    }

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

    .mode-options {
        display: flex;
        justify-content: end;
        gap: 1rem;
    }

    .mode-icon:hover {
       cursor: pointer;
    }

    .pages {
        text-align: center;
        color: gray;
    }

    .page-input {
        border: none;
        border-bottom: 1px solid gray;
        background-color: #242424;
        text-align: center;
        width: 25px;
    }

    .over {
        position: relative;
        z-index: 10;
    }

</style>