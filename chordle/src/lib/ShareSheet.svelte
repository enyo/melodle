<script lang="ts">
  import ShareIcon from '~icons/ion/share-social'
  import { guess } from './core/melody'
  import { board } from './stores/board'
  import startOfTomorrow from 'date-fns/startOfTomorrow/index.js'
  import formatDistanceToNow from 'date-fns/formatDistanceToNow/index.js'
  import { sendEvent } from './core/analytics'

  let copied = false
  const share = () => {
    let boxes = ''
    $board.guesses.forEach((melodyGuess) => {
      boxes += guess($board.melody, melodyGuess.melody, {
        difficulty: $board.difficulty,
        submitted: true,
      })
        .map((guess) => {
          switch (guess.status) {
            case 'correct':
              return '🟩'
            case 'incorrect':
              return '⬜'
            case 'wrong-position':
              return '🟨'
            case 'adjacent':
              return '🟪'
            default:
              return '??'
          }
        })
        .join('')
      if ($board.guesses.length === 1) {
        boxes += '🎉'
      }
      boxes += '\n'
    })
    const shareText = `#Melodle ${$board.difficulty} ${
      $board.index + 1
    } 🎶\n${boxes}https://melodle.yesmeno.com`

    sendEvent(`share-${$board.difficulty}`)
    if ($board.state !== 'playing') {
      sendEvent(`share-${$board.state}`)
    }
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

  let nextChallenge = formatDistanceToNow(startOfTomorrow())
</script>

<div class="share">
  <span>
    New melody in <strong>{nextChallenge}</strong>.
  </span>
  {#if copied}
    <span>Copied!</span>
  {/if}
  <button on:click={share}>Share <ShareIcon /></button>
</div>

<style lang="postcss">
  button {
    --button-text: white;
    --button-border: var(--color-success);
    --button-bg: var(--color-success);
    --button-bg-hover: var(--color-success-dark);
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
    & :global(svg) {
      max-width: none;
    }
  }
</style>
