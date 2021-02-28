<script>
  import { onMount } from "svelte";

  let surface, h, w;

  let numBalls = 12;
  let maxSize = 100;
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
        this.size = Math.random() * maxSize + 2;
        this.x = Math.random() * (w - this.size * 2) + this.size;
        this.y = Math.random() * (h - this.size * 2) + this.size;
        this.rgb = Math.ceil(this.size + 55);
        this.colour = `rgb(${this.rgb - 10},${this.rgb + 30},${this.rgb + 60})`;
      }
    }

    while (ballsArray.length <= numBalls) {
      const newBall = new Ball();
      let isFarAway = true;
      for (let i = 0; i < ballsArray.length; i++) {
        const biggerBallSize =
          newBall.size > ballsArray[i].size ? newBall.size : ballsArray[i].size;
        const dx = ballsArray[i].x - newBall.x;
        const dy = ballsArray[i].y - newBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        isFarAway = distance > biggerBallSize;
        if (!isFarAway) break;
      }
      if (isFarAway) ballsArray.push(newBall);
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
      <filter id={x} x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation={size / 75} />
      </filter>
      <circle cx={x} cy={y} r={size} fill={colour} filter={`url(#${x})`} />
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
