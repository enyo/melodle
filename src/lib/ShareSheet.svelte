<script lang="ts">
  import { board } from './stores'

  const share = () => {
    let boxes = ''
    $board.guesses.forEach((guess) => {
      boxes += $board.melody
        .guess(guess.melody, { submitted: true })
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
    }
  }
</script>

<section>
  <div class="content">
    OVER!
    <button on:click={share}>Share</button>
  </div>
</section>

<style lang="postcss">
  section {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-content: center;
    background: #0007;
  }
  .content {
    background: white;
    border-radius: 5px;
    padding: 24px;
  }
</style>
