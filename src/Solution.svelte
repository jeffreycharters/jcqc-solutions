<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { solutions } from "./stores.js";
  export let solution;

  let showX = false;

  const dispatch = createEventDispatcher();

  const removeSolution = (id) => {
    solutions.update((solns) => solns.filter((s) => s.id != id));
    dispatch("save");
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch("save");
      e.target.blur();
    }
  };

  const toggleX = () => {
    showX = !showX;
  };
</script>

<div
  class="solution-container"
  on:mouseenter={toggleX}
  on:mouseleave={toggleX}
  in:fly={{ x: 200, duration: 250 }}
  out:fade={{ duration: 100 }}
>
  {#if showX}
    <div
      class="x-button"
      on:click={() => removeSolution(solution.id)}
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 300 }}
    >
      <img src="/images/recycle.svg" alt="delete" height="15" id="delete-btn" />
    </div>
  {/if}
  <div
    class="solution-name"
    contenteditable="true"
    bind:textContent={solution.name}
    on:keypress={handleKeypress}
  />
  <div
    class="prepdate"
    contenteditable="true"
    bind:textContent={solution.prepDate}
    on:keypress={handleKeypress}
  />
</div>

<style>
  .x-button {
    position: absolute;
    top: 3px;
    right: 3px;
    display: inline;
    max-width: 20px;
    font-size: 0.6em;
    cursor: pointer;
    margin-top: 2px;
  }

  #delete-btn {
    filter: invert(42%) sepia(100) hue-rotate(310deg) saturate(800%);
  }

  .solution-name {
    grid-area: name;
    font-weight: bold;
  }

  .prepdate {
    grid-area: lot;
    position: absolute;
    width: 100%;
  }

  .solution-container {
    display: grid;
    position: relative;
    box-sizing: border-box;
    grid-template-rows: 3fr 4fr;
    grid-template-columns: 7fr 1fr;
    grid-template-areas:
      "name name"
      "lot lot";
    row-gap: 5px;
    width: 200px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 5px;
    overflow: hidden;
    background-image: linear-gradient(
      #ddd 38%,
      black 39%,
      rgba(255, 255, 255, 0.8) 40%
    );
    opacity: 0.8;
    will-change: contents;
  }

  [contenteditable] {
    outline: 0px solid transparent;
    padding: 5px;
  }
</style>
