<script lang='ts'>
  import template from '../template.json';
  import type { ICategory } from '../Types';
  import Category from './Category.svelte';

  let data = <ICategory> template;
  let edit: boolean = false;

  function beginEdit() {
    edit = true;
  }

  function cancelEdit() {
    edit = false;
  }

  function saveEdit() {
    edit = false;
    console.log("todo - save stuff here");
  }
</script>

<header>
  <h1>Quicklinks</h1>
  
  <div class="button-holder">
    {#if edit}
      <button on:click="{saveEdit}" class="positive">Save</button>
      <button on:click="{cancelEdit}">Cancel</button>
    {:else}
      <button on:click="{beginEdit}">Edit</button>
    {/if}
  </div>
</header>

<main>
  <Category bind:category={data} {edit} recursiveCategory={false}/>
</main>

<footer>
  <div>shood</div>
</footer>

<style>
  header {
    display: flex;
    align-items: center;
  }
  header h1 {
    flex: 1;
  }
  header, footer {
    padding: 0 1em;
    background-color: #222;
    color: #eee;
  }
  main {
    flex: 1;
  }
  footer div {
    padding: 1em;
    text-align: center;
  }
</style>
