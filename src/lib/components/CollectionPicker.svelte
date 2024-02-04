<script>
    import { addToCllection } from "../../services/indexedDBService";
    import { CollectionsStore } from "../../stores";

    export let isCollectionPickerOpen = false
    export let currentWord

    function closeCollectionPicker() {
        isCollectionPickerOpen = false
    }

    function addToCollection(collection) {
        collection.words.push(currentWord)
        addToCllection(collection)

        isCollectionPickerOpen = false
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
{#if isCollectionPickerOpen }
<div class="collection-picker" >
    <div class="collection-picker-container" >
        <p class="add" >Add to collection</p>

        {#if $CollectionsStore.length > 0}
            {#each $CollectionsStore  as collection}
                <div class="collection-option" on:click={()=> addToCollection(collection)} > {collection.collectionName} </div>
            {/each}
        {/if}


        <button class="button" on:click={closeCollectionPicker} >Close</button>
    </div>
</div>
{/if}

<style>
    .collection-picker {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
    }

    .collection-picker-container {
        background-color: whitesmoke;
        border: 3px solid #242424;
        border-radius: 10px;
        width: 250px;
        height: 70%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .collection-option {
       background-color: #242424;
       color: white;
       border-radius: 5px;
       padding: 5px;
    }

    .collection-option:hover {
        cursor: pointer;
    }

    .add {
        color: black;
    }

</style>