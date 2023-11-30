<script>
  import { onMount } from "svelte";

  import { ModuleStore, WordsStore } from "./stores";
  import { getAllWords } from "./services/supabaseService";
  import Nav from "./lib/components/Nav.svelte";

  import Layout from "./lib/Layout.svelte";

  // Disabling the browser back button since the app doesnt use routes
  window.history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    window.history.pushState(null, null, document.URL);
    $ModuleStore = "Home" 
  });

  onMount(async () => {
    const data = await getAllWords()
    WordsStore.set(data)
  });
</script>

<div class="layout-container" >
  <main>
    <Layout />
  </main>
  
  {#if $ModuleStore !== "Home"}
    <Nav />
  {/if}
</div>

<style>
  main {
    box-sizing: border-box;
    padding: 2rem;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .layout-container {
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 3rem;
  }
</style>
