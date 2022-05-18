<script lang="ts">
  import ShareIcon from '~icons/ion/share-social'
  import { guess } from './core/melody'
  import { board, getStoredBoard, type StoredBoard } from './stores/board'
  import startOfTomorrow from 'date-fns/startOfTomorrow/index.js'
  import formatDistanceToNow from 'date-fns/formatDistanceToNow/index.js'
  import { sendEvent } from './core/analytics'
  import type { Difficulty } from './stores/difficulty'

  let copied = false

  const getBoardShareText = (board: StoredBoard): string => {
    let boxes = `#Melodle ${board.difficulty} ${board.index + 1} 🎶\n`
    board.guesses.forEach((melodyGuess) => {
      boxes += guess(board.melody, melodyGuess.melody, {
        difficulty: board.difficulty,
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
      if (board.guesses.length === 1) {
        boxes += '🎉'
      }
      boxes += '\n'
    })
    return boxes
  }

  let otherBoard: StoredBoard

  $: {
    if (!otherBoard || otherBoard.difficulty === $board.difficulty) {
      otherBoard = getStoredBoard(
        $board.difficulty === 'easy' ? 'hard' : 'easy',
      )
    }
  }

  const share = () => {
    const boards: { [key in Difficulty]: StoredBoard } = {
      easy: getStoredBoard('easy'),
      hard: getStoredBoard('hard'),
    }
    let shareText = ''

    console.log(boards.easy.state, boards.hard.state)

    if (boards.easy.state !== 'playing' && boards.hard.state !== 'playing') {
      // We want to share both boards

      shareText += getBoardShareText(boards.easy)
      shareText += '\n'
      shareText += getBoardShareText(boards.hard)
    } else {
      shareText += getBoardShareText($board)
    }

    shareText += 'https://melodle.yesmeno.com'

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
  <div class="button-container">
    <button on:click={share}>
      Share {#if otherBoard.state !== 'playing'}both{/if}
      <ShareIcon />
    </button>
    {#if copied}
      <small class="copied">Copied!</small>
    {/if}
  </div>
</div>

<style lang="postcss">
  button {
    --button-text: white;
    --button-border: var(--color-success);
    --button-bg: var(--color-success);
    --button-bg-hover: var(--color-success-dark);
    white-space: nowrap;
    & :global(svg) {
      margin-left: 0.4em;
      font-size: 1.2em;
    }
  }
  .share {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    & :global(svg) {
      max-width: none;
    }
  }
  .button-container {
    position: relative;

    & .copied {
      display: block;
      text-align: center;
      position: absolute;
      inset: auto 0;
      bottom: -1.75em;
    }
  }
</style>
