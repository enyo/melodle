/// <reference types="unplugin-icons/types/svelte" />

type GoatCounter = {
  count: (data: { path: string; title?: string; event: boolean }) => void
}

interface Window {
  goatcounter: GoatCounter
}
// window.goatcounter.count({
//   path:  'click-banana',
//   title: 'Yellow curvy fruit',
//   event: true,
// })
