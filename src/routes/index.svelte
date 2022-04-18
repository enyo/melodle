<script lang="ts">
  import Guess from '$lib/Guess.svelte'
  import { Melody } from '$lib/melody'
  import { onMount } from 'svelte'
  import * as Tone from 'tone'

  let synth: Tone.Synth | undefined

  let melody = new Melody([48, 52, 55, 52, 48])
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

    melody.notes.forEach((note, i) => {
      synth.triggerAttackRelease(note.notation, '8n', now + time * i)
    })
  }

  type MelodyGuess = {
    melody: Melody
    submitted: boolean
  }

  const guesses: MelodyGuess[] = [
    { melody: new Melody('1 2 3 4 5'), submitted: true },
    { melody: new Melody('2 3 4 5 6'), submitted: true },
    { melody: new Melody('48 52 52 48 55'), submitted: true },
    { melody: new Melody('48 52 52'), submitted: false },
  ]
</script>

<button on:click={play}>Play</button>

{#each Array(6) as _, i}
  {@const guess = guesses[i]}
  <Guess
    correctMelody={melody}
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
