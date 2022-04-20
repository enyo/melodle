<script lang="ts">
  import Guesses from './Guesses.svelte'
  import Keyboard from './Keyboard.svelte'
  import Navbar from './Navbar.svelte'
  import { board } from './stores'
</script>

<div class="board">
  <Navbar />

  <div class="guesses">
    <Guesses />
  </div>

  <Keyboard
    on:add={(e) => board.addGuessNote(e.detail)}
    on:delete={board.deleteGuess}
    on:submit={board.submit}
    on:sharp={board.sharp}
    on:flat={board.flat}
  />
</div>

<style>
  .board {
    display: grid;
    width: 100vw;
    height: var(--size-viewport-height);
    padding: var(--size-spacing);
    gap: calc(var(--size-spacing) * 3);
    grid-template-rows: auto var(--size-board-height) auto;
    justify-items: center;
  }
  .guesses {
    align-self: center;
    justify-self: center;
  }
</style>
