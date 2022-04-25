import type { Notation } from '$lib/stores/settings'

type Event =
  | 'success-easy'
  | 'failed-easy'
  | 'success-hard'
  | 'failed-hard'
  | 'share-easy'
  | 'share-hard'
  | Notation

export const sendEvent = (event: Event) => {
  if (typeof window !== 'undefined' && window.goatcounter !== undefined) {
    window.goatcounter.count({ path: event, event: true })
  }
}
