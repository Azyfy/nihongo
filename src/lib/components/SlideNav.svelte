<script>
    export let length
    export let index
    export let resetMode = () => {}

    function previous() {
       if(index > 0) {
        index -= 1
        resetMode()
       }
    }

    function next() {
        if(index < length - 1) {
            index += 1
            resetMode()
        }
    }
</script>

 <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class="slide" >
    <div on:click={previous} class="left" ></div>
    <div on:click={next} class="right" ></div>
</div>

<style>
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