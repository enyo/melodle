<script lang="ts">
  import HelpIcon from '~icons/ion/md-help-circle-outline'
  import StatsIcon from '~icons/ion/stats-bars'
  import Modal from './Modal.svelte'
  import ShareSheet from './ShareSheet.svelte'
  import { board } from './stores'

  let showHelp =
    typeof localStorage !== 'undefined' && !localStorage.getItem('showedHelp')

  let showShareSheet = false

  const closeHelp = () => {
    showHelp = false
    localStorage.setItem('showedHelp', 'true')
  }

  $: {
    if ($board.state !== 'playing') {
      showShareSheet = true
    }
  }
</script>

<nav>
  <a href="/" on:click|preventDefault={() => (showHelp = true)}><HelpIcon /></a>
  <strong>Melodle</strong>
  <a href="/" on:click|preventDefault={() => (showShareSheet = true)}
    ><StatsIcon /></a
  >
</nav>

{#if showHelp}
  <Modal on:close={closeHelp}>
    <h1>Rules</h1>

    <p>Guess the melody in 6 tries.</p>

    <p>
      Before each guess, you can play the melody <strong>once</strong>. Listen
      to the reference C' tone first to make sure your audio is working.
    </p>

    <h2>Mobile users</h2>

    <p>
      Make sure your phone is not on silent mode, otherwise you won't be able to
      hear anything.
    </p>

    <h2>Desktop users</h2>
    <p>
      If you're using a keyboard, you can use the corresponding keys. To get a
      sharp note, you can use the up / down arrow keys.
    </p>
    <hr />
    <p>
      After each guess, the color of the tiles will change to show how close
      your guess was to the notes.
    </p>

    <p>A new Melodle is available each day.</p>
  </Modal>
{/if}

{#if showShareSheet}
  <Modal on:close={() => (showShareSheet = false)}>
    <ShareSheet />
  </Modal>
{/if}

<style lang="postcss">
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25em;
  }
</style>
