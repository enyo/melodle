<script lang="ts">
  import ShareIcon from '~icons/ion/share-social'
  import { guess } from './melody'
  import { board } from './stores/board'

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

<div class="share">
  {#if $board.state === 'success'}
    Success!
  {:else if $board.state === 'failed'}
    Better luck next time
  {/if}
  {#if copied}
    <span>Copied!</span>
  {/if}
  <button on:click={share}>Share <ShareIcon /></button>
</div>

<style lang="postcss">
  button {
    & :global(svg) {
      margin-left: 0.4em;
      font-size: 1.2em;
    }
  }
  .share {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
</style>
