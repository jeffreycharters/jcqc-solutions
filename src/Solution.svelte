<script>
  import { createEventDispatcher } from "svelte";
  import { solutions } from "./stores.js";
  export let solution;

  const dispatch = createEventDispatcher();

  const removeSolution = (name) => {
    solutions.update((solns) => solns.filter((s) => s.name != name));
    dispatch("save");
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch("save");
      e.target.blur();
    }
  };
</script>

<div class="solution-container">
  <div class="x-button" on:click={() => removeSolution(solution.name)}>❌</div>
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
    top: 0;
    right: 3px;
    display: inline;
    max-width: 20px;
    font-size: 0.6em;
    cursor: default;
    margin-top: 2px;
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
    opacity: 0.7;
  }

  [contenteditable] {
    outline: 0px solid transparent;
    padding: 5px;
  }
</style>
