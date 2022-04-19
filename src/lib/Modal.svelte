<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import CloseIcon from '~icons/ion/close-circle-outline'

  const dispatch = createEventDispatcher<{
    close: void
  }>()
</script>

<section>
  <div class="backdrop" on:click={() => dispatch('close')} />
  <div class="content">
    <button class="close" on:click={() => dispatch('close')}
      ><CloseIcon /></button
    >
    <slot />
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
    position: absolute;
    right: 12px;
    top: 12px;
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
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 5px;
    padding: 24px;
  }
</style>
