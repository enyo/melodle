<script lang="ts">
  import HelpIcon from '~icons/ion/md-help-circle-outline'
  import StatsIcon from '~icons/ion/stats-bars'
  import Modal from './Modal.svelte'
  import Stats from './Stats.svelte'
  import { board } from './stores/board'
  import Tile from './Tile.svelte'

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
  <Modal on:close={closeHelp} title="Rules">
    <p>Guess the melody in 6 tries.</p>

    <p>
      Before each guess, you can play the melody <strong>once</strong>. Listen
      to the reference C' tone first to make sure your audio is working.
    </p>

    <p>
      After each guess, it is reveiled wether the note is correct, or one
      semitone off. Examples:
    </p>

    <div class="examples">
      <div class="example">
        <div class="example-tile"><Tile semitone={2} status="correct" /></div>
        <div class="description">The note is correct</div>
      </div>
      <div class="example">
        <div class="example-tile"><Tile semitone={11} status="adjacent" /></div>
        <div class="description">
          The note is a semitone off.<br />(In this case, it must be A#)
        </div>
      </div>
      <div class="example">
        <div class="example-tile"><Tile semitone={6} status="incorrect" /></div>
        <div class="description">The note is incorrect</div>
      </div>
    </div>

    <p>A new Melodle is available each day.</p>
    <h2>Mobile users</h2>

    <p>
      Make sure your phone is not on silent mode, otherwise you won't be able to
      hear anything.
    </p>

    <h2>Desktop users</h2>
    <p>
      You can use the keyboard with the corresponding keys. To get a sharp note,
      you can use the up / down arrow keys.
    </p>
  </Modal>
{/if}

{#if showShareSheet}
  <Modal on:close={() => (showShareSheet = false)} title="Statistics">
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
  .example {
    display: flex;
    gap: var(--size-spacing);
    align-items: center;
    margin-bottom: var(--size-spacing);
  }
  .example-tile {
    width: 3em;
    height: 3em;
  }
</style>
