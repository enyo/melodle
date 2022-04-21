<script lang="ts">
  import { guess, type Melody } from './core/melody'
  import { board } from './stores/board'
  import Tile from './Tile.svelte'

  export let correctMelody: Melody
  export let guessedMelody: Melody | undefined
  export let submitted: boolean
  export let isLast = false

  $: notes = guess(correctMelody, guessedMelody, {
    difficulty: $board.difficulty,
    submitted: submitted,
  })
</script>

{#each notes as note, i}
  <Tile
    semitone={note.semitone}
    status={note.status}
    index={i}
    animate={isLast}
  />
{/each}
