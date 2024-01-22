<script>
    import {IconTrash} from "../icons"
    import {deleteIDBCollection} from "../../services/indexedDBService"

    export let collection

    $: isModalOpen = false

    function openModal() {
        isModalOpen = true
    }

    function closeModal () {
        isModalOpen = false
    }

    function deleteCollection() {
        deleteIDBCollection(collection.collectionName)
        isModalOpen = false
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div class="collections" >
    <div on:click={openModal} class="del" ><IconTrash /></div>
    <p>{collection.collectionName}</p>

    {#if isModalOpen}
        <div class="modal" >
            <button on:click={closeModal} >Cancel</button>
            <button on:click={deleteCollection} >Delete</button>
        </div>
    {/if}
</div>

<style>
    .collections {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid white;
        border-radius: 5px;
        width: 250px;
        overflow: hidden;
    }

    .del {
        display: flex;
        align-items: center;
        font-size: 1rem;
        padding: 5px;
        border-left: 1px solid white;
        color: orangered;
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0;
    }

    .del:hover {
        cursor: pointer;
    }

    .modal {
        position: absolute;
        z-index: 10;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        gap: 5px;
    }

</style>