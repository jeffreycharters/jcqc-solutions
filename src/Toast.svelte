<script>
  import { fade, fly } from "svelte/transition";
</script>

<div in:fly={{ x: -200, duration: 250 }} out:fade={{ duration: 500 }}>
  <slot />
</div>

<style>
  div {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: rgb(200, 255, 200);
    color: rgba(0, 55, 0);
    border: 1px solid rgba(0, 55, 0);
    border-radius: 10px;
    padding: 10px;
    min-width: 150px;
    font-size: 0.8em;
    font-weight: bold;
    text-align: center;
  }
</style>
