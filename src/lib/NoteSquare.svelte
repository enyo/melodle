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

<style>
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
  .wrong-position {
    background: #c4b466;
    color: white;
  }
  .correct {
    background: #76a567;
    color: white;
  }
  .incorrect {
    background: #888888;
    color: white;
  }
</style>
