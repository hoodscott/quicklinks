<script lang='ts'>
  import template from '../template.json';
  import type { CategoryT } from '../Types';
  import Category from './Category.svelte';

  let data = <CategoryT> template;
</script>

<header>Quicklinks</header>

<main>
  <Category category={data}/>
</main>

<footer>shood</footer>
