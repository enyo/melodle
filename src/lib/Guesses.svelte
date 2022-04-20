<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import { board } from './stores/board'
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
    width: min(
      400px,
      min(100vw - var(--size-spacing) * 2, var(--size-board-height) * 5 / 6)
    );
    aspect-ratio: 5/6;
    gap: 5px;
    padding: 5px;
    border-radius: 5px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
    justify-content: center;
    align-content: center;
    background: var(--color-primary);
    background: #ddd;
  }
</style>
