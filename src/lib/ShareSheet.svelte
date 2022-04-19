<script lang="ts">
  import { guess } from './melody'
  import { board } from './stores'
  import ShareIcon from '~icons/ion/share-social'

  let copied = false
  const share = () => {
    let boxes = ''
    $board.guesses.forEach((melodyGuess) => {
      boxes += guess($board.melody, melodyGuess.melody, { submitted: true })
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
    const shareText = `#Melodle ${
      $board.index + 1
    } 🎶\n${boxes}https://melodle.yesmeno.com`
    if (
      typeof navigator.share !== 'undefined' &&
      navigator.canShare({ text: shareText })
    ) {
      navigator.share({
        text: shareText,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      copied = true
    }
  }
</script>

<h1>Statistics</h1>
<p>Coming soon!</p>
{#if $board.state === 'success'}
  <h1>Success!</h1>
{:else if $board.state === 'failed'}
  <h1>Better luck next time</h1>
{/if}
<button on:click={share}>Share <ShareIcon /></button>
<br />
{#if copied}
  Copied!
{/if}

<style lang="postcss">
  button {
    & :global(svg) {
      margin-left: 0.4em;
      font-size: 1.2em;
    }
  }
</style>
