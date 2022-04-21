<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade, scale } from 'svelte/transition'
  import CloseIcon from '~icons/ion/close-circle-outline'

  const dispatch = createEventDispatcher<{
    close: void
  }>()
</script>

<section transition:fade={{ duration: 100 }}>
  <div class="backdrop" on:click={() => dispatch('close')} />
  <div class="content" transition:scale={{ start: 0.9 }}>
    <header>
      <h1><slot name="title" /></h1>
      <button class="close" on:click={() => dispatch('close')}
        ><CloseIcon /></button
      >
    </header>
    <div class="body">
      <slot />
    </div>
  </div>
</section>

<style lang="postcss">
  section {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-content: center;
    padding: 24px;
  }
  .close {
    all: unset;
    background: transparent;
    font-size: 2em;
    cusor: pointer;
  }
  .backdrop {
    position: absolute;
    inset: 0;
    background: #0007;
  }
  .content {
    position: relative;
    width: 500px;
    max-width: calc(100vw - 24px * 2);
    max-height: calc(var(--size-viewport-height) - 24px * 2);
    background: white;
    border-radius: 5px;
    padding: 12px 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    & header,
    & header h1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    & header {
      padding-left: 12px;
    }
    & .body {
      flex: 1;
      overflow-y: auto;
      padding-inline: 12px;
    }
  }
</style>
