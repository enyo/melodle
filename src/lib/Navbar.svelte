<script lang="ts">
  import HelpIcon from '~icons/ion/md-help-circle-outline'
  import StatsIcon from '~icons/ion/stats-bars'
  import Modal from './Modal.svelte'

  let showHelp =
    typeof localStorage !== 'undefined' && !localStorage.getItem('showedHelp')

  const closeHelp = () => {
    showHelp = false
    localStorage.setItem('showedHelp', 'true')
  }
</script>

<nav>
  <a href="/" on:click|preventDefault={() => (showHelp = true)}><HelpIcon /></a>
  <strong>Melodle</strong>
  <StatsIcon />
</nav>

{#if showHelp}
  <Modal on:close={closeHelp}>
    <h1>Rules</h1>

    <p>Guess the melody in 6 tries.</p>

    <p>
      Before each guess, you can play the melody <strong>once</strong>. I
      recommend to listen to the reference C' tone to make sure your audio is
      working.
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

<style>
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
