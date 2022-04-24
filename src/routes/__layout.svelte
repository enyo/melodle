<script>
  import '$lib/style/style.css'

  if (
    typeof window !== 'undefined' &&
    window.location.protocol !== 'https' &&
    !window.location.host === 'melodle.yesmeno.com'
  ) {
    window.location.replace(window.location.href.replace('http', 'https'))
  }
</script>

<svelte:head>
  <title>Melodle</title>
</svelte:head>
<slot />
