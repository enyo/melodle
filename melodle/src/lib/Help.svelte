<script lang="ts">
  import Tile from './Tile.svelte'
</script>

<p>Every day there is a new melody (one for easy, one for hard mode).</p>

<p>The melody is the same for all users.</p>

<p>You have to guess the melody in 6 tries.</p>

<p>
  Before <strong>each</strong> guess, you can play the melody
  <strong>once</strong>.
</p>

<p>You can listen to the reference C' tone as many times as you want.</p>

<p>After each guess, it is revealed which notes are correct.</p>

<div class="examples">
  <div class="example">
    <div class="example-tile"><Tile semitone={2} status="correct" /></div>
    <div class="description">The note is correct</div>
  </div>
  <div class="example">
    <div class="example-tile"><Tile semitone={6} status="incorrect" /></div>
    <div class="description">The note is incorrect</div>
  </div>
</div>
<p>
  When the <strong>game is over</strong>, you'll also see which notes you missed
  by just one key.
</p>
<div class="examples">
  <div class="example">
    <div class="example-tile"><Tile semitone={9} status="adjacent" /></div>
    <div class="description">You missed by one key.</div>
  </div>
</div>

<p>The keys on the piano don't make any sound.</p>

<p>Easy mode doesn't have any sharp keys.</p>

<h2>Desktop users</h2>
<p>
  You can use the keyboard with the corresponding keys. To get a sharp note (on
  hard mode), you can use the up / down arrow keys.
</p>

<h2>Notation</h2>

I try to detect the notation style based on your language preferences. You can
change it anytime in the settings. There's also a solfège syllables notation
(Do, Di, Re, Ri, etc...).

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
