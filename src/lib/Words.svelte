<script>
    import { CollectionsStore, RepeatWordsStore } from "../stores";
    import PageCount from "./components/PageCount.svelte";
    import SearchWord from "./components/SearchWord.svelte";
    import SlideNav from "./components/SlideNav.svelte";
    import Word from "./components/Word.svelte";
    import {addToIDB, deleteFromIDB} from "../services/indexedDBService"
    import { IconCheckPlus, IconEye, IconEyeSlash, IconFire, IconKana, IconSwap } from "./icons";
    import IconCirclePlus from "./icons/IconCirclePlus.svelte";
    import CollectionPicker from "./components/CollectionPicker.svelte";

    export let words = []
    export let moduleName = "Words"

    let searchedWord = null

    let index = 0

    let japaneseMode = "hiragana"
    let mode = japaneseMode
    let kanaOption = "hiragana"
    let modeOption = mode

    let showBurnIcon = true

    let isCollectionPickerOpen = false

    $: currentWord = searchedWord ? searchedWord : words[index]

    function changeMode() {
        mode = mode === "english" ? japaneseMode : "english"
    }

    function swapMode() {
        modeOption = modeOption === "english" ? japaneseMode : "english"
        mode = modeOption
    }

    function swapRomajiMode() {
        japaneseMode = japaneseMode === "romaji" ? kanaOption : "romaji"
        modeOption = japaneseMode
        mode = japaneseMode
    }

    function resetMode() {
        mode = modeOption
        showBurnIcon = true
    }

    function addToRepeatWords() {
        if(!currentWord) return

        const repeatWords = $RepeatWordsStore

        if(!repeatWords.some(el => el.romaji === currentWord.romaji)) {
            repeatWords.push(currentWord)
            RepeatWordsStore.set(repeatWords)

            addToIDB(currentWord, "repeatWords")

            showBurnIcon = false
        }
    }

    function removeFromRepeatWords() {
        if(!currentWord) return

        const wordIndex = words.findIndex(el => el.id === currentWord.id)
        words.splice(wordIndex, 1)
        words = words
        RepeatWordsStore.set(words)

        deleteFromIDB(currentWord.id, "repeatWords")

        if(index + 1 > words.length) {
            index -= 1
        }
    }

    function isInRepeatWords() {
        if(moduleName === "Words") {
            return $RepeatWordsStore.some(el => el.id === currentWord.id)
        }
        return false
    }

    function toggleKana() {
        kanaOption = kanaOption === "hiragana" ? "katakana" : "hiragana"
        japaneseMode = japaneseMode === "romaji" ? "romaji" : kanaOption
        modeOption = japaneseMode
        mode = japaneseMode
    }

    function openCollectionPicker() {
        isCollectionPickerOpen = true
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class="words-component" >
    <div class="mode-options over" >
        <div>
            {#if (moduleName === "Words" || moduleName === "Collection") && !!currentWord && !isInRepeatWords() && showBurnIcon}
                <span class="mode-icon" on:click={addToRepeatWords} > <IconFire></IconFire> </span>
            {:else if moduleName === "Repeat Words" && !!currentWord}
                <span class="mode-icon" on:click={removeFromRepeatWords} > <IconCheckPlus></IconCheckPlus> </span>
            {/if}
            {#if moduleName === "Words"  }
                <span class="mode-icon" on:click={openCollectionPicker} > <IconCirclePlus></IconCirclePlus> </span>
            {/if}
        </div>
       <div class="icons-container" >
            <span class="mode-icon" on:click={toggleKana} > <IconKana kana={kanaOption} /> </span>
            <span class="mode-icon" on:click={swapRomajiMode} >
                {#if japaneseMode === "romaji"}
                    <IconSwap />
                {:else}
                    <IconSwap />
                {/if}
            </span>
            <span class="mode-icon" on:click={swapMode} >
                {#if modeOption === "english"}
                    <IconEyeSlash />
                {:else}
                    <IconEye />
                {/if}
            </span>
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

    <CollectionPicker bind:isCollectionPickerOpen {currentWord} ></CollectionPicker>

    <PageCount bind:index={index} length={words.length} />

    <div class="over" >
        <SearchWord bind:word={searchedWord} />
    </div>


    <SlideNav bind:index={index} bind:length={words.length} resetMode={resetMode} />
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

    .over {
        position: relative;
        z-index: 10;
    }

</style>