<script>
    import { WordsStore } from "../stores";
    import { IconSwap } from "./icons";

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
</script>

<div class="container" >
    <input class="{word  && 'found'}" bind:value={searchWord} on:change={returWordWithMoreMeanings} on:input={searchForWord} placeholder={searchLanguage} />

    <div class="icon-container" on:click={switchLanguage} >
        <IconSwap />
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    input {
        text-align: center;
    }

    .found {
        border: 1px solid rgb(216, 255, 158);
    }

    .icon-container {
        width: 20px;
        height: 20px;
    }

    .icon-container:hover {
        cursor: pointer;
    }

</style>