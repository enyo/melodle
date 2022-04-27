<script>
  import { settings } from '$lib/stores/settings'

  import '$lib/style/style.css'
  import { onMount } from 'svelte'

  onMount(() => {
    return settings.subscribe((settings) => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.remove('light')
        if (settings.brightness !== 'system') {
          document.documentElement.classList.add(settings.brightness)
        }
      }
    })
  })
</script>

<svelte:head>
  <title>Melodle</title>
</svelte:head>

<div class={$settings.brightness}>
  <slot />
</div>

<style lang="postcss">
  div {
    display: content;
    &.light {
    }
  }
</style>
