import { writable } from 'svelte/store'

const _key = 'settings'

export const notations = ['english', 'romance', 'german', 'solfege'] as const
export type Notation = typeof notations[number]

const brightness = ['light', 'dark', 'system'] as const
type Brightness = typeof brightness[number]

const _isNotation = (notation: unknown): notation is Notation =>
  notations.includes(notation as Notation)

type Settings = {
  notation: Notation
  brightness: Brightness
}

const _getStoredSettings = (): Settings => {
  const defaultSettings: Settings = {
    notation: 'english',
    brightness: 'system',
  }
  if (typeof localStorage === 'undefined') return defaultSettings
  if (typeof navigator !== 'undefined') {
    try {
      if (
        navigator.language.startsWith('fr') ||
        navigator.language.startsWith('it') ||
        navigator.language.startsWith('es') ||
        navigator.language.startsWith('pt') ||
        navigator.language.startsWith('ro')
      ) {
        defaultSettings.notation = 'romance'
      } else if (navigator.language.startsWith('de')) {
        defaultSettings.notation = 'german'
      }
    } catch (e) {
      // Ignore any issues when trying to detect
      console.warn(e)
    }
  }

  try {
    const stored = localStorage.getItem(_key)
    if (!stored) throw `No settings stored`
    const settings = JSON.parse(stored)
    if (!_isNotation(settings['notation']))
      settings['notation'] = defaultSettings.notation
    if (!settings.brightness) settings.brightness = defaultSettings.brightness
    return settings
  } catch (e) {
    console.log(`Could not load settings: ${e}`)
  }
  return defaultSettings
}

export const _settings = writable<Settings>(_getStoredSettings())
_settings.subscribe((settings) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_key, JSON.stringify(settings))
  }
})

export const settings = {
  subscribe: _settings.subscribe,
  setNotation: (notation: Notation) =>
    _settings.update((settings) => {
      settings.notation = notation
      return settings
    }),
  switchBrightness: () =>
    _settings.update((settings) => {
      settings.brightness =
        brightness[
          (brightness.indexOf(settings.brightness) + 1) % brightness.length
        ]
      return settings
    }),
}
