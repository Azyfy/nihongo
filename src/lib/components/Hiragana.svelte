<script>
    export let letter
    export let bg = false 
    export let dark = ""

    let show = false
    $: isSmallLetter = letter.includes("_")
    $: finalLetter = isSmallLetter ? letter.slice(1) : letter
    
    $: src = `images/hiragana/${finalLetter.toLowerCase()}.png`

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
            <p>{finalLetter}</p>
        </div>
        {/if}

        <div class="img-container" >
            <img class="{isSmallLetter && 'small'}" {src} alt={finalLetter}  />
        </div>   

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
        text-align: center;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .small {
        align-self: flex-end;
        height: 70%;
    }

    .img-container {
        height: 100%;
        display: flex;
        justify-content: center;
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