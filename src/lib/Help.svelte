<script lang="ts">
  import Tile from './Tile.svelte'
</script>

<p>Guess the melody in 6 tries.</p>

<p>
  Before each guess, you can play the melody <strong>once</strong>. Listen to
  the reference C' tone first to make sure your audio is working.
</p>

<p>
  After each guess, it is reveiled wether the note is correct, or one semitone
  off. Examples:
</p>

<div class="examples">
  <div class="example">
    <div class="example-tile"><Tile semitone={2} status="correct" /></div>
    <div class="description">The note is correct</div>
  </div>
  <div class="example">
    <div class="example-tile"><Tile semitone={11} status="adjacent" /></div>
    <div class="description">
      The note is a semitone off. In this case, it must be A#.
      <strong>This is disabled in easy mode.</strong>
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
  You can use the keyboard with the corresponding keys. To get a sharp note, you
  can use the up / down arrow keys.
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
