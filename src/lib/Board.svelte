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
    min-height: 80vh;
    min-height: 100svh;
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
