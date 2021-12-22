<script lang='ts'>
  import template from '../template.json';
  import type { ICategory } from '../Types';
  import Category from './Category.svelte';

  let data = <ICategory> template;
  let edit: boolean = false;
</script>

<header>
  <h1>Quicklinks</h1>
  <!-- <label>Edit <input type="checkbox" bind:checked={edit}/></label>
  <div><button>Save</button></div> -->
</header>

<main>
  <Category category={data} {edit} recursiveCategory={false}/>
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
  footer div {
    padding: 1em;
    text-align: center;
  }
</style>
