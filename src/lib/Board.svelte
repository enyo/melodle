<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import Guesses from './Guesses.svelte'
  import Keyboard from './Keyboard.svelte'
  import Playback from './Playback.svelte'
  import ShareSheet from './ShareSheet.svelte'
  import { board } from './stores'
</script>

{#if $board.state !== 'playing'}
  <ShareSheet />
{/if}

<div class="board">
  <div class="playback">
    <Playback melody={$board.melody} />
  </div>

  <div class="guesses">
    <Guesses />
  </div>

  <div class="keyboard">
    <Keyboard
      on:add={(e) => board.addGuessNote(e.detail)}
      on:delete={board.deleteGuess}
      on:submit={board.submit}
      on:sharp={board.sharp}
      on:flat={board.flat}
    />
  </div>
</div>

<style>
  .board {
    display: grid;
    width: 100vw;
    min-height: 80vh;
    padding: 24px;
    gap: 24px;
    grid-template-rows: auto 1fr auto;
    justify-items: center;
  }
  .guesses {
    justify-self: stretch;
    align-self: center;
  }
</style>
