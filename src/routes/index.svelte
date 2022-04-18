<script lang="ts">
  import Guess from '$lib/Guess.svelte'

  import { Melody } from '$lib/melody'
  import { Note } from '$lib/note'

  import { onMount } from 'svelte'

  import * as Tone from 'tone'

  let synth: Tone.Synth | undefined

  let melodyString = '1 3 5 8 5'
  let scale = 0
  const tempo = 100

  onMount(() => {
    return () => synth?.dispose()
  })

  const play = () => {
    synth?.dispose()
    synth = new Tone.Synth().toDestination()
    const now = Tone.now()
    const time = Tone.Time('8n').toSeconds()

    Tone.Transport.bpm.setValueAtTime(tempo, now)

    const melody = new Melody(melodyString)

    melody.notes.forEach((note, i) => {
      synth.triggerAttackRelease(note.getNote(scale), '8n', now + time * i)
    })
  }

  type MelodyGuess = {
    melody: string
    submitted: boolean
  }

  const guesses: MelodyGuess[] = [
    { melody: '1 2 3 4 5', submitted: true },
    { melody: '2 3 4 5 6', submitted: false },
    { melody: '1 1 3 3 5', submitted: false },
  ]
</script>

<button on:click={play}>Play</button>

{#each Array(6) as _, i}
  {@const guess = guesses[i]}
  <Guess
    correctMelody={melodyString}
    guessedMelody={guess?.melody}
    submitted={guess?.submitted ?? false}
  />
{/each}

<style>
  button {
    font-size: 2rem;
    padding: 0.5em 1.5em;
  }
</style>
