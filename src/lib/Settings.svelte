<script lang="ts">
  import { getName } from './core/note'
  import { notations, settings } from './stores/settings'
</script>

Choose how you want your notes to be named:

<div class="notations">
  {#each notations as notation}
    <button
      class="pill"
      class:selected={$settings.notation === notation}
      on:click|preventDefault={() => settings.setNotation(notation)}
    >
      {notation}
    </button>
    <div class="name">
      <span> {getName(0, { notation })}</span>
      <span> {getName(1, { notation })}</span>
      <span>→</span>
      <span> {getName(11, { notation })}</span>
    </div>
  {/each}
</div>

<style lang="postcss">
  .notations {
    margin-top: 12px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 12px;
    & button {
      justify-content: center;
    }
    & .name span {
      display: inline-block;
      font-size: 0.875em;
      font-weight: bold;
      width: 2.5em;
      text-align: center;
    }
  }
</style>
