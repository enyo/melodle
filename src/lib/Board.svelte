<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import Keyboard from './Keyboard.svelte'
  import Playback from './Playback.svelte'
  import ShareSheet from './ShareSheet.svelte'
  import { board } from './stores'

  const share = () => {
    let boxes = ''
    $board.guesses.forEach((guess) => {
      boxes += $board.melody
        .guess(guess.melody, { submitted: true })
        .map((guess) => {
          switch (guess.status) {
            case 'correct':
              return '🟩'
            case 'incorrect':
              return '⬜'
            case 'wrong-position':
              return '🟨'
            default:
              return '??'
          }
        })
        .join('')
      boxes += '\n'
    })
    const shareText = `#Melodle 🎶\n${boxes}https://melodle.yesmeno.com`
    if (
      typeof navigator.share !== 'undefined' &&
      navigator.canShare({ text: shareText })
    ) {
      navigator.share({
        text: shareText,
      })
    } else {
      navigator.clipboard.writeText(shareText)
    }
  }
</script>

{#if $board.state !== 'playing'}
  <ShareSheet />
{/if}

<div class="board">
  <div class="playback">
    <Playback melody={$board.melody} />
  </div>

  <div class="guesses">
    {$board.melody.notes}
    {#each Array(6) as _, i}
      {@const guess = $board.guesses[i]}
      <Guess
        correctMelody={$board.melody}
        guessedMelody={guess?.melody}
        submitted={guess?.submitted ?? false}
      />
    {/each}
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
    min-height: 100vh;
    padding: 24px;
    grid-template-rows: 100px 1fr 200px;
    justify-items: center;
  }
</style>
