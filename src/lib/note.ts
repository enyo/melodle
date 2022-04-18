const _notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export class Note {
  /// Returns the note in given scale. The scale is represented as semitons
  /// starting at C4 (or c'). So a scale value of 2 means D1.
  get notation(): string {
    const notation = _notes[this.semitone % 12]
    const octave = Math.floor(this.semitone / 12)
    return `${notation}${octave}`
  }
  get notationWithoutOctave(): string {
    return _notes[this.semitone % 12]
  }
  constructor(readonly semitone: number) {}

  toString = (): string => this.notation
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('converts to scientific pitch notation', () => {
    let note = new Note(0)
    expect(note.notation).toBe('C0')
    expect(note.notationWithoutOctave).toBe('C')

    note = new Note(4)
    expect(note.notation).toBe('E0')
    expect(note.notationWithoutOctave).toBe('E')

    note = new Note(6)
    expect(note.notation).toBe('F#0')
    expect(note.notationWithoutOctave).toBe('F#')

    note = new Note(48)
    expect(note.notation).toBe('C4')
    expect(note.notationWithoutOctave).toBe('C')
  })
}
