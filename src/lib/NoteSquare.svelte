<script lang="ts" context="module">
  export type Status = 'correct' | 'wrong-position' | 'incorrect' | undefined
</script>

<script lang="ts">
  import { getNotation, type Semitone } from './note'
  export let semitone: Semitone | undefined
  export let status: Status = undefined

  $: displayNote = typeof semitone !== 'undefined' ? getNotation(semitone) : ''
</script>

<div class={status}>{displayNote}</div>

<style lang="postcss">
  div {
    font-size: 2rem;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    border: 2px solid silver;
    margin: 0;
    font-weight: bold;
  }
  .wrong-position,
  .correct,
  .incorrect {
    background: var(--color);
    border-color: var(--color);
    color: white;
  }
  .wrong-position {
    --color: #c4b466;
  }
  .correct {
    --color: #76a567;
  }
  .incorrect {
    --color: #888888;
  }
</style>
