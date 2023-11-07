<script>

export let index
export let length

$: currentPosition = (length === 0) ? 0 : index + 1

function selectPage(e) {
    const value = Number(e.target.value)

    if(!isNaN(value)) {
        if(value < 1) {
            index = 0
        }
        else if(value > length) {
            index = length - 1
        }
        else {
            index = value - 1
        }
    }
    }
</script>

<div class="pages over" > <input class="page-input" bind:value={currentPosition} on:input={selectPage} on:change={selectPage} /> / {length} </div>

<style>
    .pages {
        text-align: center;
        color: gray;
    }

    .page-input {
        border: none;
        border-bottom: 1px solid gray;
        background-color: #242424;
        text-align: center;
        width: 2rem;
    }

    .over {
        position: relative;
        z-index: 10;
    }
</style>