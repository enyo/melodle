<script lang="ts">
  import HelpIcon from '~icons/ion/md-help-circle-outline'
  import DarkIcon from '~icons/ion/ios-moon'
  import LightIcon from '~icons/ion/ios-sunny'
  import SystemIcon from '~icons/ion/iphone'
  import StatsIcon from '~icons/ion/stats-bars'
  import SettingsIcon from '~icons/ion/md-settings'
  import Help from './Help.svelte'
  import Modal from './Modal.svelte'
  import Stats from './Stats.svelte'
  import { board } from './stores/board'
  import { difficulties, difficulty } from './stores/difficulty'
  import Settings from './Settings.svelte'
  import { settings } from './stores/settings'

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
        showShareSheet = true
      }, 1000)
    }
    previousBoardState = $board.state
    previousDifficulty = $board.difficulty
  }

  let showSettings = false
</script>

<nav>
  <a href="/" on:click|preventDefault={() => (showHelp = true)}><HelpIcon /></a>
  <a
    href="/"
    on:click|preventDefault={() => settings.switchBrightness()}
    title={`Brighness ${$settings.brightness}`}
  >
    {#if $settings.brightness === 'light'}
      <LightIcon />
    {:else if $settings.brightness === 'dark'}
      <DarkIcon />
    {:else}
      <SystemIcon />
    {/if}
  </a>
  <div class="name">
    <strong> Chordle </strong>
    <div class="difficulties">
      {#each difficulties as diff}
        <a
          class="pill"
          class:selected={$difficulty === diff}
          href="/"
          on:click|preventDefault={() => ($difficulty = diff)}>{diff}</a
        >
      {/each}
    </div>
  </div>
  <a href="/" on:click|preventDefault={() => (showSettings = true)}
    ><SettingsIcon /></a
  >
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
      >Statistics <span class="pill selected">{$difficulty}</span
      ></svelte:fragment
    >
    <Stats />
  </Modal>
{/if}

{#if showSettings}
  <Modal on:close={() => (showSettings = false)}>
    <div slot="title">Settings</div>
    <Settings />
  </Modal>
{/if}

<style lang="postcss">
  nav {
    width: 100%;
    height: var(--size-navbar);
    display: flex;
    align-items: center;
    font-size: 1.25em;
    gap: 6px;
  }
  .name {
    flex: 1;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    & .difficulties {
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }
</style>
