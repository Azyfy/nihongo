<script>
    import { IconCaret } from "../icons";

    export let length
    export let index
    export let resetMode = () => {}

    function previous() {
       if(index > 0) {
        index -= 1
        resetMode()
       }
       else {
        index = length - 1
        resetMode()
       }
    }

    function next() {
        if(index < length - 1) {
            index += 1
            resetMode()
        }
        else {
            index = 0
            resetMode()
        }
    }
</script>

 <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class="slide" >
    <div on:click={previous} class="slides" >
        <IconCaret />
    </div>
    <div on:click={next} class="right slides" >
        <IconCaret />
    </div>
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

    .slides {
        display: flex;
        align-items: center;
        justify-content: start;
        opacity: 0.03;
        font-size: 3em;
        height: 90%;
        width: 50%;
    }

    .right {
        transform: rotate(180deg);
    }
</style>