<script lang="ts">
  import { onMount } from 'svelte'
  import type { Sampler } from 'tone'
  import * as Tone from 'tone'
  import PlayIcon from '~icons/ion/play'
  import { getNotation } from './core/note'
  import { board } from './stores/board'

  let sampler: Sampler

  // let synth: Tone.Synth | undefined

  const tempo = 100

  let melodyPlayed = false
  $: {
    const lastGuess = $board.guesses[$board.guesses.length - 1]
    melodyPlayed = lastGuess && lastGuess.played && !lastGuess.submitted
  }
  onMount(() => {
    sampler = new Tone.Sampler({
      urls: {
        A4: 'A4.mp3',
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
      },
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      onload: () => {
        console.log('loaded')
        Tone.Transport.bpm.setValueAtTime(tempo, Tone.now())
      },
    }).toDestination()
    return () => sampler.dispose()
  })

  const playReference = () => {
    if (!sampler.loaded) {
      window.alert('Audio not loaded yet')
      return
    }
    requireReference = false
    const now = Tone.now()

    sampler.triggerAttackRelease('C4', '2n', now)
  }
  const play = () => {
    if (requireReference || melodyPlayed) return
    if (!sampler.loaded) {
      window.alert('Audio not loaded yet')
      return
    }
    board.melodyPlayed()
    const now = Tone.now()
    const time = Tone.Time('8n').toSeconds()

    $board.melody.forEach((semitone, i) => {
      sampler.triggerAttackRelease(
        getNotation(semitone, { octave: true }),
        '4n',
        now + time * i,
      )
    })
  }

  let requireReference = !melodyPlayed && $board.state === 'playing'

  $: disablePlay =
    $board.state === 'playing' && (requireReference || melodyPlayed)
</script>

<section>
  <div class="play-buttons">
    <button class="reference round" on:click={playReference}>C'</button>

    <button class="play round" disabled={disablePlay} on:click={play}
      ><PlayIcon /></button
    >
  </div>
  {#if requireReference}
    <small>
      Play the reference C' first, to make sure your audio is working
    </small>
  {/if}
</section>

<style lang="postcss">
  section {
    text-align: center;
    position: relative;
  }
  small {
    z-index: 2000;
    position: absolute;
    background: white;
    top: 44px;
    width: 18em;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    text-align: center;
    margin-top: 8px;
    border-radius: 5px;
    border: 2px solid var(--color-primary);
    padding: 0.5em 1em;
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
