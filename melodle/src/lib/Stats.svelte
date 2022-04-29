<script lang="ts">
  import ShareSheet from './ShareSheet.svelte'
  import { board } from './stores/board'
  import { stats } from './stores/stats'

  let maxGuess: number
  $: {
    maxGuess = 0
    $stats.guessDistribution.forEach((count) => {
      if (count > maxGuess) {
        maxGuess = count
      }
    })
  }
</script>

<div class="stats">
  <div class="stat">
    <div class="number">{$stats.playedGames}</div>
    <div class="name">Played</div>
  </div>
  <div class="stat">
    <div class="number">{Math.round($stats.winPercentage * 100)}</div>
    <div class="name">Win %</div>
  </div>
  <div class="stat">
    <div class="number">{$stats.currentStreak}</div>
    <div class="name">Current Streak</div>
  </div>
  <div class="stat">
    <div class="number">{$stats.maxStreak}</div>
    <div class="name">Max Streak</div>
  </div>
</div>
{#if maxGuess > 0}
  <div class="distribution">
    {#each Array(6) as _, i}
      {@const guessCount = $stats.guessDistribution[i] ?? 0}
      <div class="bar">
        <span class="count">{i + 1}</span>
        <div class="bar-inner" style={`--bar-ratio: ${guessCount / maxGuess}`}>
          {guessCount}
        </div>
      </div>
    {/each}
  </div>
{/if}

{#if $board.state !== 'playing'}
  <hr />
  <ShareSheet />
{/if}

<div class="did-you-know">
  <strong>Did you know:</strong> you can add Melodle to your home screen on your
  phone or tablet and it will behave like an app! How to:
  <a
    target="_blank"
    href="https://www.howtogeek.com/667910/how-to-add-a-website-to-your-iphone-or-ipad-home-screen/"
    >iOS</a
  >,
  <a
    target="_blank"
    href="https://www.howtogeek.com/667938/how-to-add-a-website-to-your-android-home-screen/"
    >Android</a
  >
</div>

<style lang="postcss">
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  }
  .stat {
    text-align: center;
    & .number {
      font-weight: bold;
      font-size: 2em;
    }
  }
  .distribution {
    margin-top: 24px;
    /* height: 80px; */
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 6px;
    & .bar {
      width: 100%;
      display: flex;
      /* justify-content: flex-end; */
      align-items: center;
      gap: 12px;
      & .bar-inner {
        width: calc(1.5em + (100% - 2em) * var(--bar-ratio));
        height: 100%;
        background: var(--color-text-alpha2);
        border-radius: 3px;
        font-size: 0.875em;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 0.5em;
        font-weight: bold;
      }
    }
  }
  .did-you-know {
    margin-top: calc(4 * var(--size-spacing));
    font-size: 0.875em;
  }
</style>
