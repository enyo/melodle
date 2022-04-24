import type { Notation } from '$lib/stores/settings'

// const _notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const _notes: { [key in Notation]: string[] } = {
  english: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  romance: [
    'Do',
    'Do#',
    'Re',
    'Re#',
    'Mi',
    'Fa',
    'Fa#',
    'Sol',
    'Sol#',
    'La',
    'La#',
    'Si',
  ],
  german: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'],
  solfege: [
    'Do',
    'Di',
    'Re',
    'Ri',
    'Mi',
    'Fa',
    'Fi',
    'Sol',
    'Si',
    'La',
    'Li',
    'Ti',
  ],
}

export type Semitone = number
export type Note = string

/// Returns the note in given scale. The scale is represented as semitons
/// starting at C4 (or c'). So a scale value of 2 means D1.
export const getName = (
  semitone: Semitone,
  {
    octave = false,
    notation = 'english',
  }: { octave?: boolean; notation?: Notation } = {},
): Note => {
  const name = _notes[notation][semitone % 12]
  if (!octave) return name
  return `${name}${Math.floor(semitone / 12)}`
}
