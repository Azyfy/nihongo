<script>
    import { WordsStore } from "../../stores";
    import { IconMagicWand, IconSwap } from "../icons";

    export let word = null

    let searchLanguage = "english"

    let searchWord = ""

    function searchForWord(e) {
        word = $WordsStore.find(el => el[searchLanguage] === e.target.value.toLowerCase())
    }

    function returWordWithMoreMeanings(e) {
        let wordsContain = $WordsStore.filter(el => (el[searchLanguage].includes(e.target.value.toLowerCase()) && el[searchLanguage].includes(",")) )
        if(!word && wordsContain.length === 1) {
            word = wordsContain[0]
        }
    }

    function switchLanguage() {
        searchLanguage = searchLanguage === "english" ? "romaji" : "english"
        searchWord = ""
    }

    function clearInput() {
        searchWord = ""  
    }
</script>

<div class="search-container" >
    <input class="{word  && 'found'}" bind:value={searchWord} on:change={returWordWithMoreMeanings} on:input={searchForWord} placeholder={searchLanguage} />

    <div class="icon-container">
        <span on:click={clearInput} ><IconMagicWand /></span>
        <span on:click={switchLanguage} ><IconSwap /></span>
    </div>
</div>

<style>
    .search-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem;
        border: 1px solid gray;
        border-radius: 0.25rem;
        background-color: #2b2a33;
        color: rgb(235, 235, 235);
    }

    input {
        text-align: center;
        border: none;
        background-color: transparent;
    }

    .found {
        border: 1px solid rgb(216, 255, 158);
    }

    .icon-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
    }

    .icon-container > span:hover {
        cursor: pointer;
    }

    .icon-container > span {
       display: flex;
       align-items: center;
    }

</style>