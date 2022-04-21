<script lang="ts">
  import type { Status } from './core/melody'

  import { getNotation, type Semitone } from './core/note'
  export let semitone: Semitone | undefined
  export let status: Status = undefined

  $: displayNote = typeof semitone !== 'undefined' ? getNotation(semitone) : ''
</script>

<div class={status}>{displayNote}</div>

<style lang="postcss">
  div {
    font-size: clamp(1rem, 0.5rem + 2.5vw, 2rem);
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    /* border: 2px solid silver; */
    margin: 0;
    font-weight: bold;
    border-radius: 2px;
    background: white;
  }
  .wrong-position,
  .correct,
  .incorrect {
    background: var(--color);
    border-color: var(--color);
    color: white;
  }
  .wrong-position {
    --color: #e6bc5a;
  }
  .correct {
    --color: var(--color-success);
  }
  .incorrect {
    --color: #aaa;
  }
</style>
