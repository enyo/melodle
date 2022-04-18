<script lang="ts">
  import type { Melody } from './melody'
  import type { Note } from './note'
  import NoteSquare, { type Status } from './NoteSquare.svelte'

  export let correctMelody: Melody
  export let guessedMelody: Melody | undefined
  export let submitted: boolean

  type GuessedNote = {
    note?: Note
    status?: Status
  }
  let notes: GuessedNote[]
  $: {
    notes = guessedMelody
      ? correctMelody.guess(guessedMelody, { submitted: submitted })
      : [{}, {}, {}, {}, {}]
  }
</script>

<div class="container">
  {#each notes as note}
    <NoteSquare note={note.note} status={note.status} />
  {/each}
</div>

<style>
  .container {
    display: flex;
  }
</style>
