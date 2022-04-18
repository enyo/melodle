<script lang="ts">
  import type { Melody } from '$lib/melody'
  import { onMount } from 'svelte'
  import * as Tone from 'tone'

  let synth: Tone.Synth | undefined

  export let melody: Melody
  const tempo = 100

  onMount(() => {
    return () => synth?.dispose()
  })

  const playReference = () => {
    synth?.dispose()
    synth = new Tone.Synth().toDestination()
    const now = Tone.now()

    Tone.Transport.bpm.setValueAtTime(tempo, now)

    synth.triggerAttackRelease('C4', '4n', now)
  }
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
</script>

<button on:click={playReference}>Reference C</button>
<button on:click={play}>Play</button>

<style>
  button {
    font-size: 2rem;
    padding: 0.5em 1.5em;
  }
</style>
