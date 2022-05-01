<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import DeleteIcon from '~icons/ion/backspace-outline'
  import SubmitIcon from '~icons/ion/checkmark'
  import { board, getCurrentGuess, getGuessCount } from './stores/board'
  import { fade } from 'svelte/transition'
  import Playback from './Playback.svelte'
  import { difficulty } from './stores/difficulty'
  import { getName } from './core/note'
  import { settings } from './stores/settings'

  const dispatch = createEventDispatcher<{
    add: number
    sharp: void
    flat: void
    delete: void
    submit: void
  }>()

  type Key = {
    semitone: number
    name: string
    englishName: string
  }

  let keys: Key[]
  const semitones = Array.from(Array(12).keys())

  $: keys = semitones
    // .filter(
    //   (semitone) =>
    //     $difficulty === 'hard' || ![1, 3, 6, 8, 10].includes(semitone),
    // )
    .map((semitone) => ({
      semitone: 12 * 4 + semitone,
      name: getName(semitone, { notation: $settings.notation }),
      englishName: getName(semitone),
    }))

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
        if ($difficulty !== 'easy') {
          dispatch('sharp')
        }
      } else if (event.key == 'ArrowDown') {
        if ($difficulty !== 'easy') {
          dispatch('sharp')
        }
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
      currentGuess.melody.length === $board.melody.length
    showDelete =
      currentGuess && !currentGuess.submitted && currentGuess.melody.length > 0
  }

  $: currentGuess = getCurrentGuess($board)
</script>

<div class="container" class:finished={$board.state !== 'playing'}>
  <div class="actions">
    <button
      transition:fade={{ duration: 100 }}
      class="delete round"
      class:hidden={!showDelete}
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
  {#if !showSubmit && currentGuess}
    {#if currentGuess.melody.length === 0}
      <nav class="keyboard">
        {#each keys as key}
          <button
            on:click={() => dispatch('add', key.semitone)}
            class={key.englishName.toLowerCase().replace('#', 'sharp')}
            class:sharp={key.englishName.includes('#')}
          >
            {key.name}</button
          >
        {/each}
      </nav>
    {:else if currentGuess.melody.length === 1}
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 3)}
        >Minor</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 4)}
        >Major</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 5)}
        >Sus4</button
      >
    {:else if currentGuess.melody.length === 2}
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 6)}
        >Diminished 5th</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 7)}
        >5th</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 8)}
        >Augmented 5th</button
      >
    {:else if currentGuess.melody.length === 3}
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 9)}
        >6th</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 10)}
        >Min7</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 11)}
        >Maj7</button
      >
    {:else if currentGuess.melody.length === 4}
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 13)}
        >b9</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 14)}
        >9</button
      >
      <button on:click={() => dispatch('add', currentGuess.melody[0] + 15)}
        >#9</button
      >
    {/if}
  {/if}
</div>

<style lang="postcss">
  .container {
    width: 100%;
    max-width: min(40rem, 60vh);
    position: relative;
    &.finished .keyboard {
      opacity: 0.2;
      pointer-events: none;
    }
  }
  .actions {
    display: flex;
    touch-action: manipulation;

    gap: var(--size-spacing);
    height: var(--size-actions-height);
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--size-spacing);

    & button {
      pointer-events: all;
      font-size: 1.5em;
      padding: 4px;
      &.hidden {
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
    touch-action: manipulation;

    --columns-per-key: 3;
    margin: 0 auto;
    width: 100%;
    height: var(--size-keyboard-height);
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

    &:not(.sharp) {
      border-radius: 6px;
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: calc(var(--columns-per-key) * var(--key) + 1);
      grid-column-end: calc(var(--columns-per-key) * (var(--key) + 1) + 1);
      background: white;
      color: black;
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
