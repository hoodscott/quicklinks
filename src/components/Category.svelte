<script type="ts">
  import type { ICategory, ILink } from "../Types";
  import Link from "./Link.svelte";

  export let category: ICategory;
  export let edit: boolean;
  export let recursiveCategory: boolean = true;

  let newLinkLink: string = '';
  let newLinkDesc: string = '';
  let newCatDesc: string = '';
  let inlineColour: string = generateColour();
  
  function generateColour(): string {
    const randHue = Math.floor(Math.random() * 360);
    return `background-color:hsl(${randHue},40%,10%);`;
  }

  function openAll(cat: ICategory): void {
    cat.links.forEach((link) => {
      console.log("open link here: ", link.link);
      window.open(link.link, "_blank");
    });

    cat.categories.forEach((subCat) => {
      openAll(subCat);
    });
  }

  function addCategory() {
    /* New category is valid */
    if (newCatDesc) {
      const newCategory: ICategory = {
        categories: [],
        links: [],
        desc: newCatDesc,
        poll: false
      };
      category.categories.push(newCategory);

      /* Reset form */
      newCatDesc = "";

      /* Trigger refresh */
      category = category;
    } else {
      console.error("Invalid new category");
    }
  }

  function addLink() {
    /* New link is valid */
    if (newLinkLink && newLinkDesc) {
      const newLink: ILink = {
        link: newLinkLink,
        desc: newLinkDesc
      };
      category.links.push(newLink);

      /* Reset form */
      newLinkLink = "";
      newLinkDesc = "";

      /* Trigger refresh */
      category = category;
    } else {
      console.error("Invalid new link");
    }
  }

  function removeCategory() {
    category = null;
  }
  function removeLink(index) {
    category.links.splice(index, 1);
    category=category;
  }
</script>

{#if category}
  <section class:recursiveCategory style="{inlineColour}">
    {#if recursiveCategory}
      <header>
        <h2>{category.desc}</h2>
        <div>
          {#if !edit}
            <button type="button" on:click={() => openAll(category)}>Open All</button>
          {:else}
            <button type="button" on:click={removeCategory} class="negative">Remove</button>
          {/if}
        </div>
      </header>

      <ul>
        {#each category.links as link, index}
          <li><Link {link} />
            {#if edit}
              <button type="button" on:click="{() => removeLink(index)}" class="negative">Remove</button>
            {/if}
          </li>
        {/each}
      </ul>

      {#if edit}
        <div>
          <input bind:value={newLinkLink} />
          <input bind:value={newLinkDesc} />
          <button type="button" on:click={addLink}>New Link</button>
        </div>

        <div>
          <input bind:value={newCatDesc} />
          <button type="button" on:click={addCategory}>New Category</button>
        </div>
      {/if}
    {/if}
    
    {#if category.categories.length}
      <div class="categories">
        {#each category.categories as subCat}
          {#if subCat != null}
            <svelte:self category={subCat} {edit} />
          {/if}
        {/each}
      </div>
    {/if}

    {#if !recursiveCategory}
    <div class="root-add">
      <input bind:value={newCatDesc} />
      <button type="button" on:click={addCategory}>New Category</button>
    </div>
    {/if}
  </section>
{/if}

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
  li button {
    margin-left:1em;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
  }
  .recursiveCategory .categories {
    margin: 1em 0;
  }
  .root-add {
    padding: 1rem;
  }
</style>
