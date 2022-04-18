<script lang="ts" context="module">
  export type Status = 'correct' | 'wrong-position' | 'incorrect' | undefined
</script>

<script lang="ts">
  import type { Note } from './note'
  export let note: Note | undefined
  export let status: Status = undefined

  $: displayNote = note ? note.notationWithoutOctave : ''
</script>

<div class={status}>{displayNote}</div>

<style>
  div {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    border: 1px solid gray;
    margin: 0.1em;
    padding: 1em;
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
