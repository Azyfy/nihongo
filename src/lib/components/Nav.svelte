<script>
    import { ModuleStore } from "../../stores";
    import { IconHome } from "../icons";
    import Kana from "./Kana.svelte";

    function setModule(module) {
        console.log("MOD", module)
        ModuleStore.set(module)
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="nav" >
    {#if $ModuleStore === "Kana Chart" || $ModuleStore === "Hiragana" || $ModuleStore === "Katakana"}
        <div on:click={() => {setModule('Hiragana')}} class="nav-button img-button {$ModuleStore === "Kana Chart" || $ModuleStore === "Hiragana" ? 'active-button' : ''}" > <img src="images/hiragana/a.png" alt="hiragana" /> </div>
        <div on:click={() => {setModule('Katakana')}} class="nav-button img-button {$ModuleStore === "Katakana" ? 'active-button' : ''}" > <img src="images/katakana/a.png" alt="katakana" /> </div>
    {/if}

    <span on:click={() => {setModule('Home')}} class="home-icon" >
        <IconHome />
    </span>
</div>

<style>
    .nav {
        position: sticky;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        bottom: 0;
        border-top: 1px solid rgb(205, 205, 205);
        background-color: #242424;
    }

    .home-icon {
        position: absolute;
        right: 20px;
        top: 30%;
        font-size: 1.5625rem;
    }

    .home-icon:hover {
        color: red;
        cursor: pointer;
    }

    .nav-button {
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav-button:hover {
        cursor: pointer;
    }

    .img-button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15px;
        height: 15px;
        padding: 5px;
        border: 1px solid rgb(205, 205, 205);
        border-radius: 0.3125rem;
        transition: transform 1s ease-in-out;
    }

    .active-button {
        transform: scale(1.1);
    }

    .img-button::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: -10;
        opacity: 0.1;
    }

    .img-button > img {
        width: 100%;
        height: 100%;
    }   
</style>