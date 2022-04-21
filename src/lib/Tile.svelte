<script lang="ts">
  import type { Status } from './core/melody'

  import { getNotation, type Semitone } from './core/note'
  export let semitone: Semitone | undefined
  export let status: Status = undefined
  export let animate = false
  // Used to stagger the animation
  export let index = 0

  $: displayNote = typeof semitone !== 'undefined' ? getNotation(semitone) : ''
</script>

<div class="container">
  <div class="note">{displayNote}</div>
  {#if status}
    <div class={`note ${status} index${index}`} class:animate>
      {displayNote}
    </div>
  {/if}
</div>

<style lang="postcss">
  @keyframes appear0 {
    0% {
      clip-path: circle(0%);
    }
    100% {
      clip-path: circle(75%);
    }
  }
  @keyframes appear1 {
    0% {
      clip-path: circle(0%);
      opacity: 0;
    }
    10% {
      clip-path: circle(0%);
      opacity: 1;
    }
    100% {
      clip-path: circle(75%);
    }
  }
  @keyframes appear2 {
    0% {
      clip-path: circle(0%);
      opacity: 0;
    }
    20% {
      clip-path: circle(0%);
      opacity: 1;
    }
    100% {
      clip-path: circle(75%);
    }
  }
  @keyframes appear3 {
    0% {
      clip-path: circle(0%);
      opacity: 0;
    }
    30% {
      clip-path: circle(0%);
      opacity: 1;
    }
    100% {
      clip-path: circle(75%);
    }
  }
  @keyframes appear4 {
    0% {
      clip-path: circle(0%);
      opacity: 0;
    }
    40% {
      clip-path: circle(0%);
      opacity: 1;
    }
    100% {
      clip-path: circle(75%);
    }
  }
  .container {
    position: relative;
    font-size: clamp(1rem, 0.5rem + 2.5vw, 2rem);
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
  }
  .note {
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;
    /* border: 2px solid silver; */
    margin: 0;
    font-weight: bold;
    border-radius: 2px;
    background: white;
    &.wrong-position,
    &.adjacent,
    &.correct,
    &.incorrect {
      --time: 400ms;
      &.animate.index0 {
        animation: appear0 calc(var(--time)) ease-in-out;
      }
      &.animate.index1 {
        animation: appear1 calc(var(--time) * 1.2) ease-in-out;
      }
      &.animate.index2 {
        animation: appear2 calc(var(--time) * 1.4) ease-in-out;
      }
      &.animate.index3 {
        animation: appear3 calc(var(--time) * 1.6) ease-in-out;
      }
      &.animate.index4 {
        animation: appear4 calc(var(--time) * 1.8) ease-in-out;
      }
      position: absolute;
      inset: 0;
      background: var(--color);
      border-color: var(--color);
      color: white;
    }
    &.wrong-position {
      --color: #e6bc5a;
    }
    &.correct {
      --color: var(--color-success);
    }
    &.adjacent {
      --color: #bf63f2;
    }
    &.incorrect {
      --color: #aaa;
    }
  }
</style>
