<script>
  import { RepeatWordsStore } from "../stores";
    import SearchWord from "./SearchWord.svelte";
    import Word from "./Word.svelte";
    import { IconCheckPlus, IconEye, IconEyeSlash, IconFire, IconSwap } from "./icons";

    export let words = []
    export let moduleName = "Words"

    let searchedWord = null

    let index = 0
    $: currentPosition = (words.length === 0) ? 0 : index + 1

    let japaneseMode = "hiragana"
    let mode = japaneseMode
    let modeOption = mode

    $: currentWord = searchedWord ? searchedWord : words[index]

    function previous() {
       if(index > 0) {
        index -= 1
        resetMode()
       }
    }

    function next() {
        if(index < words.length - 1) {
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
        japaneseMode = japaneseMode === "romaji" ? "hiragana" : "romaji"
        modeOption = japaneseMode
        mode = japaneseMode
    }

    function resetMode() {
        mode = modeOption
    }

    function addToRepeatWords() {
        if(!currentWord) return

        const repeatWords = $RepeatWordsStore
        if(!repeatWords.some(el => el.romaji === currentWord.romaji)) {
            repeatWords.push(currentWord)
            RepeatWordsStore.set(repeatWords)
        }
    }

    function removeFromRepeatWords() {
        if(!currentWord) return

        const wordIndex = words.findIndex(el => el.id === currentWord.id)
        words.splice(wordIndex, 1)
        words = words
        RepeatWordsStore.set(words)
    }

    function selectPage(e) {
        const value = Number(e.target.value)

        if(!isNaN(value)) {
            if(value < 1) {
                index = 0
            }
            else if(value > words.length) {
                index = words.length - 1
            }
            else {
                index = value - 1
            }
        }
    }
</script>

<div class="words-component" >
    <div class="mode-options over" >
        <div>
            {#if moduleName === "Words" && !!currentWord}
                <span class="mode-icon" on:click={addToRepeatWords} > <IconFire></IconFire> </span>
            {:else if moduleName === "Repeat Words" && !!currentWord}
                <span class="mode-icon" on:click={removeFromRepeatWords} > <IconCheckPlus></IconCheckPlus> </span>
            {/if}
        </div>
       <div class="icons-container" >
            <span class="mode-icon" on:click={swapRomajiMode} >
                {#if japaneseMode === "romaji"}
                    <IconEyeSlash></IconEyeSlash>
                {:else}
                    <IconEye></IconEye>
                {/if}
            </span>
            <span class="mode-icon" on:click={swapMode} ><IconSwap /></span>
       </div>
    </div>

    <div class="words over" >
        {#if words.length > 0}
            <div class="word-container" >
                <div class="word-card" on:click|self={changeMode} >
                    <Word word="{currentWord}" {mode} />
                </div>
            </div>
        {/if}
    </div>

    <div class="pages over" > <input class="page-input" bind:value={currentPosition} on:input={selectPage} /> / {words.length} </div>

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
        border-radius: 1rem;
        overflow: hidden;
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
        justify-content: space-between;
        font-size: 1.5rem;
        gap: 1rem;
    }

    .icons-container {
        display: flex;
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