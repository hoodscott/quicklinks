<script type='ts'>
  import type { CategoryT } from '../Types';
  import Link from './Link.svelte';

  export let category: CategoryT;

  function openAll(cat: CategoryT): void {
    cat.links.forEach(link => {
      console.log('open link here: ', link.link);
      window.open(link.link, "_blank");
    })

    cat.categories.forEach(subCat => {
      openAll(subCat);
    })
  }
</script>

<section class='category'>
  <div class='heading'>
    <h2>{category.desc}</h2>

    <div><button on:click='{() => openAll(category)}'>Open All</button></div>
  </div>

  <ul>
    {#each category.links as link}
      <li><Link {link}/></li>
    {/each}
  </ul>

  {#each category.categories as subCat}
    <svelte:self category={subCat}/>
  {/each}
</section>

<style>
  .category {
    border: 1px solid black;
    margin: 1em;
  }

  .heading {
    display: flex;
  }
  .heading>div {
    margin-left: auto;
  }
  .heading button {
    white-space: nowrap;
  }
</style>

