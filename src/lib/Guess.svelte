<script lang="ts">
  import { guess, type Melody } from './melody'
  import NoteSquare from './NoteSquare.svelte'

  export let correctMelody: Melody
  export let guessedMelody: Melody | undefined
  export let submitted: boolean

  $: notes = guess(correctMelody, guessedMelody, { submitted: submitted })
</script>

{#each notes as note}
  <NoteSquare semitone={note.semitone} status={note.status} />
{/each}
