<script type="ts">
  import type { ICategory, ILink } from "../Types";
  import Link from "./Link.svelte";

  export let category: ICategory;
  export let edit: boolean;
  export let recursiveCategory: boolean = true;

  let inlineColour: string = generateColour();

  $: category, tidyNulls();

  function tidyNulls() {
    category.categories = category.categories.filter(cat => cat != null);
  }
  
  function generateColour(): string {
    const randHue = Math.floor(Math.random() * 360);
    return `background-color:hsl(${randHue},40%,10%);`;
  }

  function openAll(cat: ICategory): void {
    cat.links.forEach((link) => {
      window.open(link.link, "_blank");
    });
    
    /* Recursively open all links in subcategories */
    cat.categories.forEach((subCat) => {
      openAll(subCat);
    });
  }

  function addCategory(event: Event) {
    /* Read data from form */
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const catNew = formData.get("desc").toString();

    /* New category is valid */
    if (catNew) {
      const newCategory: ICategory = {
        categories: [],
        links: [],
        desc: catNew,
        poll: false
      };
      category.categories.push(newCategory);

      /* Reset form */
      form.reset();

      /* Trigger refresh */
      category = category;
    } else {
      console.error("Invalid new category");
    }
  }

  function addLink(event: Event) {
    /* Read data from form */
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const linkNewLink = formData.get("link").toString();
    const linkNewDesc = formData.get("desc").toString();

    /* New link is valid */
    if (linkNewLink && linkNewDesc) {
      const newLink: ILink = {
        link: linkNewLink,
        desc: linkNewDesc
      };
      category.links.push(newLink);

      /* Reset form */
      form.reset();

      /* Trigger refresh */
      category = category;
    } else {
      console.error("Invalid new link");
    }
  }

  function removeCategory() {
    category = null;
  }
  
  function removeLink(index: number) {
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
        <form on:submit|preventDefault="{addLink}" class="add-link">
          <input type="url" required name="link" placeholder="Hyperlink"/>
          <input type="text" required name="desc" placeholder="Link Description"/>
          <button type="submit">Add New Link</button>
        </form>

        <form on:submit|preventDefault="{addCategory}">
          <input type="text" required name="desc" placeholder="Category Name"/>
          <button type="submit">Add New Category</button>
        </form>
      {/if}
    {/if}
    
    {#if category.categories.length}
      <div class="categories">
        {#each category.categories as subCat}
          {#if subCat != null}
            <svelte:self bind:category={subCat} {edit} />
          {/if}
        {/each}
      </div>
    {/if}

    {#if !recursiveCategory && edit}
      <form on:submit|preventDefault="{addCategory}" class="root-add">
        <input type="text" required name="desc" placeholder="Category Name"/>
        <button type="submit">Add New Category</button>
      </form>
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

  form {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.25rem;
    max-width: 420px;
  }
  form.add-link {
    margin-bottom: 1em;
  }
  form button {
    align-self: flex-end;
  }
</style>
