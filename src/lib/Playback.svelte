<script lang="ts">
  import type { Melody } from '$lib/melody'
  import { onMount } from 'svelte'
  import * as Tone from 'tone'
  import { getNotation } from './note'

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

    melody.forEach((semitone, i) => {
      synth.triggerAttackRelease(
        getNotation(semitone, { octave: true }),
        '8n',
        now + time * i,
      )
    })
  }
</script>

<button on:click={playReference}>C'</button>
<button on:click={play}>Play melody</button>
