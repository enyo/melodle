<script lang="ts">
  import ShareSheet from './ShareSheet.svelte'
  import { board } from './stores/board'
  import { stats } from './stores/stats'
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

{#if $board.state !== 'playing'}
  <hr />
  <ShareSheet />
{/if}

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
</style>
