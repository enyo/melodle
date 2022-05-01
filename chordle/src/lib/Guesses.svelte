<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import { board, getGuessCount } from './stores/board'
</script>

<div class="guesses" style={`--notes: ${$board.melody.length};`}>
  {#each Array(6) as _, i}
    {@const guess = $board.guesses[i]}
    <Guess
      correctMelody={$board.melody}
      guessedMelody={guess?.melody}
      submitted={guess?.submitted ?? false}
      isLast={i === getGuessCount($board) - 1}
    />
  {/each}
</div>

<style>
  .guesses {
    --notes: 3;
    display: grid;
    width: min(
      400px,
      min(
        100vw - var(--size-spacing) * 2,
        var(--size-board-height) * var(--notes) / 6
      )
    );
    aspect-ratio: var(--notes) / 6;
    gap: 5px;
    padding: 5px;
    border-radius: 5px;
    grid-template-columns: repeat(var(--notes), minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
    justify-content: center;
    align-content: center;
    background: var(--color-bg-dull);
  }
</style>
