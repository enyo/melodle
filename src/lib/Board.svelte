<script lang="ts">
  import { getNotation } from './core/note'

  import Guesses from './Guesses.svelte'
  import Keyboard from './Keyboard.svelte'
  import Navbar from './Navbar.svelte'
  import { board } from './stores/board'
</script>

<div class="board">
  <Navbar />

  <div class="guesses">
    <Guesses />
    {#if $board.state === 'failed'}
      <div class="solution">
        <div class="notes">
          {$board.melody.map((semitone) => getNotation(semitone)).join(' ')}
        </div>
      </div>
    {/if}
  </div>

  <Keyboard
    on:add={(e) => board.addGuessNote(e.detail)}
    on:delete={board.deleteGuess}
    on:submit={board.submit}
    on:sharp={board.sharp}
    on:flat={board.flat}
  />
</div>

<style lang="postcss">
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
    position: relative;
    align-self: center;
    justify-self: center;
  }
  .solution {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -24px;
    display: flex;
    justify-content: center;
    & .notes {
      background: var(--color-primary);
      border-radius: 5px;
      padding: 0.2em 0.5em;
      font-weight: bold;
      color: white;
      font-size: 1.5em;
    }
  }
</style>
