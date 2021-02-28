<script>
  import { onMount } from "svelte";

  let surface, h, w;

  let numBalls = 8;
  let maxSize = 200;
  let ballsArray = [];

  onMount(() => {
    h = surface.clientHeight;
    w = surface.clientWidth;
    window.addEventListener("resize", () => {
      h = surface.clientHeight;
      w = surface.clientWidth;
    });

    class Ball {
      constructor() {
        this.size = Math.random() * maxSize + 5;
        this.x = Math.random() * (w - this.size * 2) + this.size;
        this.y = Math.random() * (h - this.size * 2) + this.size;
        this.rgb = Math.ceil(255 - maxSize + this.size);
        this.colour = `rgb(${this.rgb},${this.rgb},${this.rgb})`;
      }
    }

    for (let i = 0; i < numBalls; i++) {
      ballsArray.push(new Ball());
    }
    ballsArray.sort((a, b) => {
      return b.size - a.size;
    });
    ballsArray = [...ballsArray];
  });
</script>

<div bind:this={surface} id="ballsDiv">
  <svg>
    {#each ballsArray as { x, y, size, colour }}
      <circle cx={x} cy={y} r={size} fill={colour} />
    {/each}
  </svg>
</div>

<style>
  #ballsDiv {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -10;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
