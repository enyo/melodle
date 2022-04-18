<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import { Melody } from '$lib/melody'
  import Keyboard from './Keyboard.svelte'
  import { Note } from './note'
  import Playback from './Playback.svelte'

  let melody = new Melody([48, 52, 55, 52, 48])

  type MelodyGuess = {
    melody: Melody
    submitted: boolean
  }

  let guesses: MelodyGuess[] = []

  const addGuessNote = (semitone) => {
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
    let currentGuess = guesses[guesses.length - 1]
    if (currentGuess && !currentGuess.submitted) {
      currentGuess.melody.notes.pop()
    }
    // Trigger change detection
    guesses = guesses
  }
  const submit = () => {
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

  let finished = false
</script>

<Playback {melody} />

{#each Array(6) as _, i}
  {@const guess = guesses[i]}
  <Guess
    correctMelody={melody}
    guessedMelody={guess?.melody}
    submitted={guess?.submitted ?? false}
  />
{/each}

<Keyboard
  on:add={(e) => addGuessNote(e.detail)}
  on:delete={deleteGuess}
  on:submit={submit}
/>

<style>
</style>
