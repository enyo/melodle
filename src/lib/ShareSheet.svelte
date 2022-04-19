<script lang="ts">
  import { board } from './stores'

  let copied = false
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
      copied = true
    }
  }
</script>

<section>
  <div class="content">
    {#if $board.state === 'success'}
      <h1>Success!</h1>
    {:else if $board.state === 'failed'}
      <h1>Better luck next time</h1>
    {/if}
    <button on:click={share}>Share</button>
    <br />
    {#if copied}
      Copied!
    {/if}
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
