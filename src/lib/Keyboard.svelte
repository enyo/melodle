<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import DeleteIcon from '~icons/ion/backspace-outline'
  import SubmitIcon from '~icons/ion/checkmark'
  import { board, getCurrentGuess } from './stores'
  import { fade } from 'svelte/transition'
  import Playback from './Playback.svelte'

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

  let showSubmit = false
  let showDelete = false

  $: {
    const currentGuess = getCurrentGuess($board)
    showSubmit =
      currentGuess &&
      !currentGuess.submitted &&
      currentGuess.melody.length === 5
    showDelete =
      currentGuess && !currentGuess.submitted && currentGuess.melody.length > 0
  }
</script>

<div class="container" class:finished={$board.state !== 'playing'}>
  <div class="actions">
    <button
      transition:fade={{ duration: 100 }}
      class="delete round"
      class:hidden={!showDelete}
      disabled={!showDelete}
      on:click={() => dispatch('delete')}><DeleteIcon /></button
    >
    <Playback />
    <button
      transition:fade={{ duration: 100 }}
      class="submit round"
      class:hidden={!showSubmit}
      disabled={!showSubmit}
      on:click={() => dispatch('submit')}><SubmitIcon /></button
    >
  </div>
  <nav class="keyboard">
    {#each notes as note}
      <button
        on:click={() => dispatch('add', note.semitone)}
        class={note.name.toLowerCase().replace('#', 'sharp')}
        class:sharp={note.name.includes('#')}
      >
        {note.name}</button
      >
    {/each}
  </nav>
</div>

<style lang="postcss">
  .container {
    width: 100%;
    max-width: min(40rem, 60vh);
    position: relative;
    &.finished {
      opacity: 0.2;
      pointer-events: none;
    }
  }
  .actions {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    & button {
      pointer-events: all;
      font-size: 1.5em;
      padding: 4px;
      &[disabled] {
        opacity: 0.2;
      }
      &.submit:not([disabled]) {
        --button-text: var(--color-success);
        --button-border: var(--color-success);
        --button-bg-hover: #10c11011;
      }
    }
  }
  .keyboard {
    --columns-per-key: 3;
    margin: 0 auto;
    aspect-ratio: 3;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: repeat(21, 1fr);
    gap: 3px;
    background: rgba(131, 58, 180, 1);
    background: linear-gradient(
      90deg,
      rgba(131, 58, 180, 1) 0%,
      rgba(253, 29, 29, 1) 50%,
      rgba(252, 176, 69, 1) 100%
    );

    border-radius: 10px;
    padding: 5px;
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

    border-radius: 0 0 6px 6px;
    &:first-child,
    &:last-child {
      border-radius: 6px;
    }
    &:not(.sharp) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: calc(var(--columns-per-key) * var(--key) + 1);
      grid-column-end: calc(var(--columns-per-key) * (var(--key) + 1) + 1);
      background: white;
      &:hover {
        background: #ccc;
      }
    }
    &.sharp {
      z-index: 100;
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: calc(var(--columns-per-key) * var(--key) + 3);
      grid-column-end: calc(var(--columns-per-key) * (var(--key) + 1) + 2);
      background: black;
      color: white;
      &:hover {
        background: #333;
      }
    }
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
