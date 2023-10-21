<script>
    export let letter

    let show = false

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
        <div class="letter-container" >
            <p>{letter}</p>
        </div>
        {/if}

        <img src="images/hiragana/{letter.toLowerCase()}.png" alt={letter}  />
    </div>




<style>

    .letter-container {
        border: 1px solid white;
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 3.125rem;
        left: 0;
        z-index: 10;
    }

    img {
        width: 100%;
        height: 100%;
        }

    .image-container {
        position: relative;
        border: 1px solid red;
        width: 3.125rem;
        height: 3.125rem;
    }

</style>