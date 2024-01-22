<script>
    import { CollectionsStore } from "../stores";
    import IconFilePlus from "./icons/IconFilePlus.svelte"
    import {createIDBCollection} from "../services/indexedDBService"
    import CollectionCard from "./components/CollectionCard.svelte"

    $: isModalOpen = false

    let inputName = ""

    function openCollectionCreateForm() {
        isModalOpen = true
    }

    function closeModal() {
        isModalOpen = false
        inputName = ""
    }

    function createCollection() {
        if($CollectionsStore.some(store => store.collectionName === inputName)) {
            isModalOpen = false
            return
        }
        createIDBCollection(inputName)
        isModalOpen = false
        inputName = ""
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class="collection-main" >

    {#if $CollectionsStore.length > 0}
        <div class="collection-container" >
            <div class="options" >
                <span class="icon" on:click={openCollectionCreateForm} > <IconFilePlus /></span>
            </div>
            {#each $CollectionsStore  as collection}
                <CollectionCard {collection} />
            {/each}
        </div>
    {:else}
       <div class="empty" >
            <span class="add-icon" on:click={openCollectionCreateForm} > <IconFilePlus /></span>
       </div>
    {/if}

    {#if isModalOpen}
        <div class="modal" >
            <div class="inside-modal" >
                <input bind:value={inputName} placeholder="Collection name" />

                <div class="modal-buttons" >
                    <button on:click={closeModal} >Close</button>
                    <button on:click={createCollection} >Confirm</button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .collection-main {
        position: relative;
        height: 100%;
    }

    .empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .collection-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 25px;
        gap: 25px;
    }

    .options {
        position: sticky;
        top: 0;
        width: 135%;
        display: flex;
        justify-content: end;
    }

    .add-icon {
        font-size: 5rem;
    }

    .icon {
        font-size: 2rem;
    }

    .add-icon:hover, .icon:hover {
        cursor: pointer;
    }

    .modal {
        position: absolute;
        z-index: 10;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .inside-modal {
        padding: 25px 50px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 25px;
        background-color: white;
        width: 50vh;
    }

    .modal-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 25px;
    }
</style>
