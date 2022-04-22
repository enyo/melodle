<script lang="ts">
  import { fade } from 'svelte/transition'
  import { getNotation } from './core/note'
  import Guesses from './Guesses.svelte'
  import Keyboard from './Keyboard.svelte'
  import Navbar from './Navbar.svelte'
  import { board } from './stores/board'
</script>

<div class="board">
  <Navbar />

  <div class="guesses">
    {#key `${$board.index}-${$board.difficulty}`}
      <Guesses />
      {#if $board.state === 'failed'}
        <div class="solution" in:fade={{ duration: 500, delay: 1000 }}>
          <div class="notes">
            {#each $board.melody.map( (semitone) => getNotation(semitone), ) as note}
              <span>{note}</span>
            {/each}
          </div>
        </div>
      {/if}
    {/key}
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
    left: 12px;
    right: 12px;
    bottom: -24px;
    & .notes {
      background: rgba(0, 0, 0, 0.8);
      border-radius: 5px;
      padding: 0.5em 1em;
      font-weight: bold;
      color: white;
      font-size: 1em;
      display: flex;
      justify-content: space-between;
      gap: 1.5em;
    }
  }
</style>
