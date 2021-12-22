<script type="ts">
  import type { ILink } from "../Types";

  export let link: ILink;
</script>

<a href={link.link}>{link.desc}</a>

<style>
  a {
    display: inline-block;
    padding: 0.5em 0;
  }
</style>
