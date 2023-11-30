<script>
    import Kana from "./components/Kana.svelte";
    import { CHART } from "../constants/letters";
</script>

<div class="chart-container" >
    {#each CHART as array}
        <div class="chart-row" >
            {#each array as letter}
                {#if letter}
                    <Kana letter="{letter}" bg="{true}" />
                {:else}
                    <div class="empty" ></div>
                {/if}
            {/each}
        </div>
    {/each}

</div>


<style>
    .chart-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .chart-row {
        display: flex;
        gap: 15px;
    }

    .empty {
        width: 50px;
        height: 50px;
    }

</style>