<script lang="ts">
  import { cubicOut, quadOut } from 'svelte/easing'
  import type { TransitionConfig } from 'svelte/transition'
  import type { Status } from './core/melody'
  import { getNotation, type Semitone } from './core/note'
  export let semitone: Semitone | undefined
  export let status: Status = undefined
  export let animate = false
  // Used to stagger the animation
  export let index = 0

  $: displayNote = typeof semitone !== 'undefined' ? getNotation(semitone) : ''

  function appear(
    _node: Element,
    { duration = 1200 }: { duration?: number } = {},
  ): TransitionConfig {
    if (!animate) {
      return { duration: 0, css: () => '' }
    }

    const stagger = 200
    const totalStagger = stagger * index
    const totalDuration = duration + totalStagger

    let tStart = totalStagger / totalDuration
    return {
      duration: totalDuration,
      css: (t) => {
        let easedAndStaggeredX: number
        let easedAndStaggeredY: number
        if (t < tStart) {
          easedAndStaggeredX = 0
          easedAndStaggeredY = 0
        } else {
          easedAndStaggeredX = cubicOut(
            !tStart ? t : (t - tStart) * (1 / (1 - tStart)),
          )
          easedAndStaggeredY = quadOut(
            !tStart ? t : (t - tStart) * (1 / (1 - tStart)),
          )
        }

        // clip-path: circle(${easedAndStaggered * 100}%);
        return `
          clip-path: ellipse(${easedAndStaggeredY * 300}% ${
          easedAndStaggeredX * 200
        }% at -10% 50%);
					`
      },
    }
  }
</script>

<div class="container">
  <div class="note">{displayNote}</div>
  {#if status}
    {#key status}
      <div class={`note ${status}`} in:appear>
        {displayNote}
      </div>
    {/key}
  {/if}
</div>

<style lang="postcss">
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
