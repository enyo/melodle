<script lang="ts">
  import Tile from './Tile.svelte'
</script>

<p>Guess the melody in 6 tries.</p>

<p>
  Before each guess, you can play the melody <strong>once</strong>. Listen to
  the reference C' tone first to make sure your audio is working.
</p>

<p>
  After a guess, it is revealed which notes are correct. When the game is over,
  you'll also see which notes you missed by just one key.
</p>

<div class="examples">
  <div class="example">
    <div class="example-tile"><Tile semitone={2} status="correct" /></div>
    <div class="description">The note is correct</div>
  </div>
  <div class="example">
    <div class="example-tile"><Tile semitone={6} status="incorrect" /></div>
    <div class="description">The note is incorrect</div>
  </div>
  <div class="example">
    <div class="example-tile"><Tile semitone={11} status="adjacent" /></div>
    <div class="description">
      <strong>Only revealed at the end of a game!</strong>
      Shows that you guessed the key right next to it.
    </div>
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
  You can use the keyboard with the corresponding keys. To get a sharp note, you
  can use the up / down arrow keys.
</p>

<h2>Notation</h2>

I try to detect the notation style based on your language preferences. You can
change it anytime in the settings. There's also a solfège syllables notation.

<hr />
<p>
  Built by <a href="https://www.yesmeno.com">Matias Meno</a>. This is a variant
  of the wildly successful game
  <a href="https://www.nytimes.com/games/wordle">Wordle</a> originally developed
  by Josh Wardle. Built with <a href="https://kit.svelte.dev">SvelteKit</a>. I
  use analytics by <a href="https://www.goatcounter.com">GoatCounter</a> and there
  is no Cookie consent box, because I don't track you.
</p>

<style lang="postcss">
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
