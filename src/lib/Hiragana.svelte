<script>
    export let letter
    export let bg = false 
    export let dark = ""

    let show = false
    
    $: src = `images/hiragana/${letter.toLowerCase()}.png`

    function showLetter() {
        show = true
    }

    function hideLetter() {
        show = false
    }
</script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="image-container" on:mouseenter={showLetter} on:mouseleave={hideLetter} >
        {#if show}
        <div class="letter-container {dark}" >
            <p>{letter}</p>
        </div>
        {/if}

        <img {src} alt={letter}  />

        {#if bg}
            <div class="background-light" ></div>
        {/if}
    </div>




<style>

    .letter-container {
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 3.125rem;
        left: -1px;
        z-index: 10;
    }

    img {
        width: 100%;
        height: 100%;
        }

    .image-container {
        position: relative;
       
        width: 3.125rem;
        height: 3.125rem;
    }

    .background-light {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border: 1px solid red;
        background-color: rgba(255, 255, 255, 0.75);
        z-index: -10;
        border-radius: 100%;
    }

    .dark {
        color: black;
    }

</style>