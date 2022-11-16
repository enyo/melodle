<script lang="ts">
  import { settings, type Brightness } from '$lib/stores/settings'

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

  const isDarkMode = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  type ExplicitBrightness = Exclude<Brightness, 'system'>

  let systemBrightness: ExplicitBrightness = isDarkMode() ? 'dark' : 'light'

  onMount(() => {
    const listener = (event: MediaQueryListEvent) => {
      systemBrightness = event.matches ? 'dark' : 'light'
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', listener)
    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  })

  let explicitBrightness: ExplicitBrightness

  $: explicitBrightness =
    $settings.brightness === 'system' ? systemBrightness : $settings.brightness

  $: themeColor = explicitBrightness === 'light' ? '#fff' : '#222'
</script>

<svelte:head>
  <title>Melodle</title>
  <meta name="theme-color" content={themeColor} />
</svelte:head>

<div class={$settings.brightness}>
  <slot />
</div>

<a class="pausly" href="https://www.pausly.app">Take a break with Pausly.</a>

<style lang="postcss">
  div {
    display: content;
    &.light {
    }
  }
  .pausly {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>
