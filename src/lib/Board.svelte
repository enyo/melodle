<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import { Melody } from '$lib/melody'
  import Keyboard from './Keyboard.svelte'
  import { Note } from './note'
  import Playback from './Playback.svelte'

  function _rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }
  const _randNote = () => _rand(12 * 4, 12 * 5)
  let melody = new Melody([
    _randNote(),
    _randNote(),
    _randNote(),
    _randNote(),
    _randNote(),
  ])

  type MelodyGuess = {
    melody: Melody
    submitted: boolean
  }

  let guesses: MelodyGuess[] = []
  let finished = false

  $: {
    const success = !!guesses
      .filter((guess) => guess.submitted)
      .find((guess) => melody.isCorrect(guess.melody))

    const failed = guesses.filter((guess) => guess.submitted).length === 6

    finished = success || failed
  }

  const addGuessNote = (semitone) => {
    if (finished) return
    let currentGuess = guesses[guesses.length - 1]

    if (!currentGuess || currentGuess.submitted) {
      currentGuess = { melody: new Melody([]), submitted: false }
      guesses.push(currentGuess)
    }

    if (currentGuess.melody.notes.length >= 5) {
      return
    }
    currentGuess.melody.notes.push(new Note(semitone))

    // Trigger change detection
    guesses = guesses
  }
  const deleteGuess = () => {
    if (finished) return
    let currentGuess = guesses[guesses.length - 1]
    if (!currentGuess || currentGuess.submitted) {
      return
    }
    currentGuess.melody.notes.pop()
    // Trigger change detection
    guesses = guesses
  }
  const _getLastNote = () => {
    let currentGuess = guesses[guesses.length - 1]
    if (!currentGuess || currentGuess.submitted) {
      return
    }
    return currentGuess.melody.notes[currentGuess.melody.notes.length - 1]
  }
  const sharp = () => {
    if (finished) return
    const note = _getLastNote()
    if (!note) return
    note.semitone = note.semitone + 1
    // Trigger change detection
    guesses = guesses
  }
  const flat = () => {
    if (finished) return
    const note = _getLastNote()
    if (!note) return
    note.semitone = note.semitone - 1
    if (note.semitone < 0) {
      note.semitone += 12
    }
    // Trigger change detection
    guesses = guesses
  }
  const submit = () => {
    if (finished) return
    let currentGuess = guesses[guesses.length - 1]
    if (
      !currentGuess ||
      currentGuess.submitted ||
      currentGuess.melody.notes.length < 5
    ) {
      return
    }
    currentGuess.submitted = true

    // Trigger change detection
    guesses = guesses
  }
  const share = () => {
    let boxes = ''
    guesses.forEach((guess) => {
      boxes += melody
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
    if (typeof navigator.share !== 'undefined') {
      navigator.share({
        title: '#Melodle 🎶',
        text: `${boxes}`,
        url: 'https://melode.yesmeno.com',
      })
    } else {
      navigator.clipboard.writeText(
        `#Melodle 🎶\n${boxes}https://melodle.yesmeno.com`,
      )
    }
  }
</script>

<div class="board">
  <div class="playback">
    <Playback {melody} />
  </div>

  <div class="guesses">
    {#if finished}
      OVER!
      <button on:click={share}>Share</button>
    {/if}
    {#each Array(6) as _, i}
      {@const guess = guesses[i]}
      <Guess
        correctMelody={melody}
        guessedMelody={guess?.melody}
        submitted={guess?.submitted ?? false}
      />
    {/each}
  </div>

  <div class="keyboard">
    <Keyboard
      on:add={(e) => addGuessNote(e.detail)}
      on:delete={deleteGuess}
      on:submit={submit}
      on:sharp={sharp}
      on:flat={flat}
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
