<script>
    import Hiragana from "./Hiragana.svelte";
    import { VOWELS, CHART } from "../constants/letters";

    console.log("CHART", CHART)
</script>

<div class="chart-container" >
    {#each CHART as array}
    <div class="chart-row" >
        {#each array as letter}
            {#if letter}
                <Hiragana letter="{letter}" />
            {:else}
                <div class="empty" ></div>
            {/if}
        {/each}
    </div>
    {/each}

    <!-- <div class="chart-row" >
        {#each VOWELS as vowel}
            <Hiragana letter="{vowel}" />
        {/each}
    </div>

    <div class="chart-row" >
        {#each VOWELS as vowel}
            <Hiragana letter="{'k' + vowel}" />
        {/each}
    </div>

    <div class="chart-row" >
        {#each VOWELS as vowel}
            {#if vowel === 'i'}
                <Hiragana letter="{'sh' + vowel}" />
            {:else }
                <Hiragana letter="{'s' + vowel}" />
            {/if}
        {/each}
    </div>

    <div class="chart-row" >
        {#each VOWELS as vowel}
            {#if vowel === 'i'}
                <Hiragana letter="{'ch' + vowel}" />
            {:else if vowel === 'u'}
                <Hiragana letter="{'ts' + vowel}" />
            {:else }
                <Hiragana letter="{'t' + vowel}" />
            {/if}
        {/each}
    </div> -->
</div>


<style>
    .chart-container {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .chart-row {
        display: flex;
        gap: 25px;
    }

    .empty {
        width: 50px;
        height: 50px;
    }

</style>