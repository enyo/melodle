<script lang="ts">
  import type { Melody } from '$lib/melody'
  import { onMount } from 'svelte'
  import * as Tone from 'tone'
  import { getNotation } from './note'
  import { board } from './stores'

  let synth: Tone.Synth | undefined

  export let melody: Melody
  const tempo = 100

  let melodyPlayed = false
  $: {
    const lastGuess = $board.guesses[$board.guesses.length - 1]
    melodyPlayed = lastGuess && lastGuess.played && !lastGuess.submitted
  }

  onMount(() => {
    return () => synth?.dispose()
  })

  const playReference = () => {
    requireReference = false
    synth?.dispose()
    synth = new Tone.Synth().toDestination()
    const now = Tone.now()

    Tone.Transport.bpm.setValueAtTime(tempo, now)

    synth.triggerAttackRelease('C4', '4n', now)
  }
  const play = () => {
    if (requireReference || melodyPlayed) return
    board.melodyPlayed()
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

  let requireReference = !melodyPlayed && $board.state === 'playing'
</script>

<section>
  <button on:click={playReference}>Reference C'</button>

  <button disabled={requireReference || melodyPlayed} on:click={play}
    >Play melody</button
  >
  {#if requireReference}
    <br />
    <small>
      Play the reference note first, to make sure your audio is working
    </small>
  {/if}
</section>

<style lang="postcss">
  section {
    text-align: center;
  }
</style>
