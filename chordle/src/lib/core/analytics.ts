import type { Notation } from '$lib/stores/settings'

type Event =
  | 'success-easy'
  | 'success-medium'
  | 'success-hard'
  | 'failed-easy'
  | 'failed-medium'
  | 'failed-hard'
  | 'share-easy'
  | 'share-medium'
  | 'share-hard'
  | 'share-success'
  | 'share-failed'
  | Notation

export const sendEvent = (event: Event) => {
  if (typeof window !== 'undefined' && window.goatcounter !== undefined) {
    window.goatcounter.count({ path: event, event: true })
  }
}
