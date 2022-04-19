<script lang="ts">
  import { guess, type Melody } from './melody'
  import Tile from './Tile.svelte'

  export let correctMelody: Melody
  export let guessedMelody: Melody | undefined
  export let submitted: boolean

  $: notes = guess(correctMelody, guessedMelody, { submitted: submitted })
</script>

{#each notes as note}
  <Tile semitone={note.semitone} status={note.status} />
{/each}
