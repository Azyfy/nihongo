<script>
  import { onMount } from "svelte";

  import { ModuleStore, WordsStore } from "./stores";
  import { getAllWords } from "./services/supabaseService";

  import Layout from "./lib/Layout.svelte";

  onMount(async () => {
    const data = await getAllWords()
    WordsStore.set(data)
  });

  function goHome() {
    ModuleStore.set("Home")
  }

</script>

<main>
  <Layout />
</main>

<div class="nav" >
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span on:click={goHome} class="home-icon" >
      <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg> 
  </span>
</div>

<style>
  main {
    box-sizing: border-box;
    height: 90vh;
    padding: 2rem;
    overflow: hidden;
    overflow-y: auto;
  }

  .nav {
    position: sticky;
    bottom: 0;
    border-top: 1px solid white;
    background-color: #242424;
    padding: 5px;
  }

  .home-icon {
    font-size: 25px;
  }

  .home-icon:hover {
    color: red;
    cursor: pointer;
  }
</style>
