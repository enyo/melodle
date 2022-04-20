<script lang="ts">
  import { onMount } from 'svelte'
  import * as Tone from 'tone'
  import PlayIcon from '~icons/ion/play'
  import { getNotation } from './note'
  import { board } from './stores'

  let synth: Tone.Synth | undefined

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

    $board.melody.forEach((semitone, i) => {
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
  <div class="play-buttons">
    <button class="reference round" on:click={playReference}>C'</button>

    <button
      class="play round"
      disabled={requireReference || melodyPlayed}
      on:click={play}><PlayIcon /></button
    >
  </div>
  {#if requireReference}
    <small>
      Play the reference note first, to make sure your audio is working
    </small>
  {/if}
</section>

<style lang="postcss">
  section {
    text-align: center;
    position: relative;
  }
  small {
    display: block;
    text-align: center;
    margin-top: 8px;
  }
  .play-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
  button {
    &.reference {
      opacity: 0.7;
      font-weight: bold;
    }
    &.play {
      --button-text: white;
      --button-bg: black;
      --button-border: black;
      --button-bg-hover: #333;

      --button-disabled-text: #fff;
      --button-disabled-bg: #ccc;
      --button-disabled-border: #ccc;
    }
  }
</style>
