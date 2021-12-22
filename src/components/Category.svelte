<script type="ts">
  import type { ICategory, ILink } from "../Types";
  import Link from "./Link.svelte";

  export let category: ICategory;
  export let edit: boolean;
  export let recursiveCategory: boolean = true;

  let inlineColour: string = generateColour();
  
  function generateColour(): string {
    const randHue = Math.floor(Math.random() * 360);
    return `background-color:hsl(${randHue},40%,10%);`;
  }

  let newLink: ILink = {
    link: "",
    desc: "",
  };

  function openAll(cat: ICategory): void {
    cat.links.forEach((link) => {
      console.log("open link here: ", link.link);
      window.open(link.link, "_blank");
    });

    cat.categories.forEach((subCat) => {
      openAll(subCat);
    });
  }

  function addLink() {
    /* New link is valid */
    if (newLink.link && newLink.desc) {
      category.links.push(newLink);

      /* Reset form */
      newLink.link = "";
      newLink.desc = "";

      /* Trigger refresh */
      category = category;
    } else {
      console.error("Invalid new link");
    }
  }
</script>

<section class:recursiveCategory style="{inlineColour}">
  {#if recursiveCategory}
    <header>
      <h2>{category.desc}</h2>
      <div>
        <button type="button" on:click={() => openAll(category)}>Open All</button>
      </div>
    </header>

    {#if edit}
      <div>
        <input bind:value={newLink.link} />
        <input bind:value={newLink.desc} />
        <button type="button" on:click={addLink}>New Link</button>
      </div>
    {/if}

    <ul>
      {#each category.links as link}
        <li><Link {link} /></li>
      {/each}
    </ul>
  {/if}
  
  {#if category.categories.length}
    <div class="categories">
      {#each category.categories as subCat}
        <svelte:self category={subCat} {edit} />
      {/each}
    </div>
  {/if}
</section>

<style>
  section.recursiveCategory {
    padding: 0 1em;
    flex: 1 0;
    min-width: 175px;
    color: #ccc;
  }

  header {
    display: flex;
  }
  h2 {
    flex: 1;
  }
  header button {
    margin-top: 1.2em;
    white-space: nowrap;
  }

  ul {
    margin: 0 0 1em;
    list-style-type: none;
    padding-inline-start: 1em;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
  }
  .recursiveCategory .categories {
    margin: 1em 0;
  }
  
</style>
