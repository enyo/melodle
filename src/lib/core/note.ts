const _notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export type Semitone = number
export type Note = string

/// Returns the note in given scale. The scale is represented as semitons
/// starting at C4 (or c'). So a scale value of 2 means D1.
export const getNotation = (
  semitone: Semitone,
  { octave = false } = {},
): Note => {
  const notation = _notes[semitone % 12]
  if (!octave) return notation
  return `${notation}${Math.floor(semitone / 12)}`
}
