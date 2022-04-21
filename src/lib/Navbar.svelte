<script lang="ts">
  import HelpIcon from '~icons/ion/md-help-circle-outline'
  import StatsIcon from '~icons/ion/stats-bars'
  import Help from './Help.svelte'
  import Modal from './Modal.svelte'
  import Stats from './Stats.svelte'
  import { board, type BoardState } from './stores/board'
  import { difficulty, type Difficulty } from './stores/difficulty'

  let showHelp =
    typeof localStorage !== 'undefined' && !localStorage.getItem('showedHelp')

  const closeHelp = () => {
    showHelp = false
    localStorage.setItem('showedHelp', 'true')
  }

  let previousBoardState = $board.state
  let previousDifficulty = $board.difficulty
  let showShareSheet = $board.state !== 'playing'
  $: {
    if (
      $board.state !== 'playing' &&
      (previousBoardState === 'playing' ||
        previousDifficulty !== $board.difficulty)
    ) {
      setTimeout(() => {
        console.log('showing')
        showShareSheet = true
      }, 1000)
    }
    previousBoardState = $board.state
    previousDifficulty = $board.difficulty
  }
</script>

<nav>
  <a href="/" on:click|preventDefault={() => (showHelp = true)}><HelpIcon /></a>
  <div class="name">
    <strong> Melodle </strong>
    <div class="difficulties">
      <a
        class="pill"
        class:selected={$difficulty === 'easy'}
        href="/"
        on:click|preventDefault={() => ($difficulty = 'easy')}>easy</a
      >
      <a
        class="pill"
        class:selected={$difficulty === 'medium'}
        href="/"
        on:click|preventDefault={() => ($difficulty = 'medium')}>medium</a
      >
    </div>
  </div>
  <a href="/" on:click|preventDefault={() => (showShareSheet = true)}
    ><StatsIcon /></a
  >
</nav>

{#if showHelp}
  <Modal on:close={closeHelp}>
    <div slot="title">Rules</div>
    <Help />
  </Modal>
{/if}

{#if showShareSheet}
  <Modal on:close={() => (showShareSheet = false)}>
    <svelte:fragment slot="title"
      >Statistics <span class="pill">{$difficulty}</span></svelte:fragment
    >
    <Stats />
  </Modal>
{/if}

<style lang="postcss">
  nav {
    width: 100%;
    height: var(--size-navbar);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25em;
  }
  .name {
    display: flex;
    gap: 12px;
    align-items: center;
    & .difficulties {
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }
</style>
