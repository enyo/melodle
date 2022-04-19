<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import { board } from './stores'
</script>

<div class="guesses">
  {#each Array(6) as _, i}
    {@const guess = $board.guesses[i]}
    <Guess
      correctMelody={$board.melody}
      guessedMelody={guess?.melody}
      submitted={guess?.submitted ?? false}
    />
  {/each}
</div>

<style>
  .guesses {
    display: grid;
    width: 100%;
    max-width: min(400px, 90vh - 400px);
    margin: 0 auto;
    aspect-ratio: 5 / 6;
    gap: 4px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }
</style>
