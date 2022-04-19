<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  const dispatch = createEventDispatcher<{
    add: number
    sharp: void
    flat: void
    delete: void
    submit: void
  }>()

  const notes = [
    { semitone: 48, name: 'C' },
    { semitone: 49, name: 'C#' },
    { semitone: 50, name: 'D' },
    { semitone: 51, name: 'D#' },
    { semitone: 52, name: 'E' },
    { semitone: 53, name: 'F' },
    { semitone: 54, name: 'F#' },
    { semitone: 55, name: 'G' },
    { semitone: 56, name: 'G#' },
    { semitone: 57, name: 'A' },
    { semitone: 58, name: 'A#' },
    { semitone: 59, name: 'B' },
  ]

  onMount(() => {
    const validKeys = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11, h: 11 }
    const keyListener = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        dispatch('delete')
      } else if (event.key === 'Enter') {
        dispatch('submit')
      } else if (validKeys[event.key] !== undefined) {
        dispatch('add', validKeys[event.key] + 12 * 4)
      } else if (event.key == 'ArrowUp') {
        dispatch('sharp')
      } else if (event.key == 'ArrowDown') {
        dispatch('flat')
      } else {
        return
      }
      event.preventDefault()
    }
    document.addEventListener('keydown', keyListener)
    return () => document.removeEventListener('keydown', keyListener)
  })
</script>

<div class="actions">
  <button on:click={() => dispatch('delete')}>Delete</button>
  <button on:click={() => dispatch('submit')}>Submit</button>
</div>
<section class="keyboard">
  {#each notes as note}
    <button
      on:click|preventDefault={() => dispatch('add', note.semitone)}
      class={note.name.toLowerCase().replace('#', 'sharp')}
      class:sharp={note.name.includes('#')}
    >
      {note.name}</button
    >
  {/each}
</section>

<style lang="postcss">
  .actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin: 0 0 24px;
  }
  .keyboard {
    --columns-per-key: 3;
    /* height: 200px; */
    width: 100%;
    max-width: 40rem;
    min-width: 20rem;
    aspect-ratio: 3;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: repeat(21, 1fr);
    gap: 2px;
    background: black;
    padding: 3px;
  }
  .keyboard button {
    grid-area: 1 / 9 / 2;
    --key: 0;
    grid-column-start: calc(var(--columns-per-key) * var(--key) + 1);
    grid-column-end: calc(var(--columns-per-key) * (var(--key) + 1) + 1);

    display: flex;
    justify-content: center;
    align-items: flex-end;

    border: none;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5em 0;
  }
  .keyboard button:not(.sharp) {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: calc(var(--columns-per-key) * var(--key) + 1);
    grid-column-end: calc(var(--columns-per-key) * (var(--key) + 1) + 1);
    background: white;
  }
  .keyboard button:not(.sharp):hover {
    background: #ccc;
  }
  .keyboard button.sharp {
    z-index: 100;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: calc(var(--columns-per-key) * var(--key) + 3);
    grid-column-end: calc(var(--columns-per-key) * (var(--key) + 1) + 2);
    background: black;
    color: white;
  }
  .keyboard button.sharp:hover {
    background: #333;
  }

  .keyboard button.c {
    --key: 0;
  }
  .keyboard button.csharp {
    --key: 0;
  }
  .keyboard button.d {
    --key: 1;
  }
  .keyboard button.dsharp {
    --key: 1;
  }
  .keyboard button.e {
    --key: 2;
  }
  .keyboard button.f {
    --key: 3;
  }
  .keyboard button.fsharp {
    --key: 3;
  }
  .keyboard button.g {
    --key: 4;
  }
  .keyboard button.gsharp {
    --key: 4;
  }
  .keyboard button.a {
    --key: 5;
  }
  .keyboard button.asharp {
    --key: 5;
  }
  .keyboard button.b {
    --key: 6;
  }
</style>
