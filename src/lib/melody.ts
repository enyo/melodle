import { Note } from './note'

export class Melody {
  constructor(exercise: string)
  constructor(notes: Note[])

  /// Accepts a string of scale degrees and parses that.
  /// Example:
  ///
  ///     new Melody('triade', '1 3 5 3 1'); // Major triade
  constructor(exercise: string | Note[]) {
    if (exercise instanceof Array) {
      this.notes = exercise
    } else {
      const scaleDegrees = exercise.split(' ')

      this.notes = scaleDegrees.map((degreeString) => new Note(degreeString))
    }
  }

  notes: Note[]

  toString = (): string => `${this.notes.join(' ')}`
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('properly parses strings', () => {
    let exercise = new Melody('1 3 5 3 1')
    expect(exercise.notes).toHaveLength(5)
    expect(exercise.notes[0].toString()).toBe('1')
    expect(exercise.notes[1].toString()).toBe('3')
    expect(exercise.notes[2].toString()).toBe('5')
    expect(exercise.notes[3].toString()).toBe('3')
    expect(exercise.notes[4].toString()).toBe('1')
    expect(exercise.toString()).toBe('1 3 5 3 1')

    exercise = new Melody('1 5')
    expect(exercise.notes).toHaveLength(2)
    expect(exercise.toString()).toBe('1 5')

    exercise = new Melody('1 5b')
    expect(exercise.toString()).toBe('1 5b')
  })
}
