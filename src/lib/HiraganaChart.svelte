<script>
    import Hiragana from "./Hiragana.svelte";
    import { VOWELS } from "../constants/letters";
</script>

<div class="chart-container" >
    <div class="chart-row" >
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
    </div>
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

</style>