<script lang='ts'>
  import template from '../template.json';
  import type { ICategory } from '../Types';
  import Category from './Category.svelte';
  import { fade } from "svelte/transition";

  let data: ICategory = getDataFromLocalStorage() || <ICategory> template;
  let edit: boolean = false;
  let justSaved: boolean = false;

  function getDataFromLocalStorage(): ICategory {
    const x = window.localStorage.getItem("cat");
    if (!x) return null;
    return JSON.parse(x);
  }

  function beginEdit() {
    edit = true;
  }

  function cancelEdit() {
    edit = false;
  }

  function saveEdit() {
    edit = false;
    window.localStorage.setItem('cat', JSON.stringify(data));
    justSaved = true;
    setTimeout(() => {
      justSaved = false;
    }, 4);
  }
</script>

<header>
  <h1>Quicklinks</h1>

  {#if justSaved}
    <span out:fade>Saved!</span>
  {/if}
  
  <div class="button-holder">
    {#if edit}
      <button type="button" on:click="{saveEdit}" class="positive">Save</button>
      <button type="button" on:click="{cancelEdit}">Cancel</button>
    {:else}
      <button type="button" on:click="{beginEdit}">Edit</button>
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
    gap: 1em;
  }
  main {
    flex: 1;
  }
  footer div {
    padding: 1em;
    text-align: center;
  }
</style>
