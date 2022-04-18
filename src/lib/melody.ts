import { Note } from './note'

export type Status = 'correct' | 'wrong-position' | 'incorrect' | undefined
export type GuessedNote = {
  note?: Note
  status?: Status
}

export class Melody {
  constructor(exercise: string)
  constructor(notes: number[])

  constructor(exercise: string | number[]) {
    if (exercise instanceof Array) {
      this.notes = exercise.map((note) => new Note(note))
    } else {
      this.notes = exercise
        .split(' ')
        .map((note) => new Note(parseInt(note, 10)))
    }
  }

  notes: Note[]

  get semitones(): number[] {
    return this.notes.map((note) => note.semitone)
  }

  guess = (guess: Melody, { submitted = false } = {}): GuessedNote[] => {
    const notes = []
    const remainingMelodyNotes = [...this.semitones]

    for (let i = 0; i < 5; i++) {
      const note = guess.notes[i]

      if (!note) {
        notes[i] = {}
        continue
      }

      let status: Status
      if (submitted) {
        if (remainingMelodyNotes[i] == note.semitone) {
          status = 'correct'
          remainingMelodyNotes[i] = undefined
        } else if (remainingMelodyNotes.includes(note.semitone)) {
          status = 'wrong-position'
          remainingMelodyNotes[remainingMelodyNotes.indexOf(note.semitone)] =
            undefined
        } else {
          status = 'incorrect'
        }
      }

      notes[i] = { note, status }
    }
    return notes
  }

  toString = (): string => `${this.notes.join(' ')}`
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('properly parses strings', () => {
    let exercise = new Melody('1 3 5 3 1')
    expect(exercise.notes).toHaveLength(5)

    expect(exercise.notes[0].toString()).toBe('C#0')
    expect(exercise.notes[1].toString()).toBe('D#0')
    expect(exercise.notes[2].toString()).toBe('F0')
    expect(exercise.notes[3].toString()).toBe('D#0')
    expect(exercise.notes[4].toString()).toBe('C#0')
    expect(exercise.toString()).toBe('C#0 D#0 F0 D#0 C#0')

    exercise = new Melody('48 52')
    expect(exercise.notes).toHaveLength(2)
    expect(exercise.toString()).toBe('C4 E4')
  })
  it('properly returns semitones', () => {
    expect(new Melody('1 3 5 3 1').semitones).toMatchObject([1, 3, 5, 3, 1])
  })
  it('can evaluate guesses', () => {
    const correct = new Melody('48 50 55 60 48')

    let guess = correct.guess(new Melody('48 50 55 60 48'))
    expect(guess).toHaveLength(5)
    expect(guess[0].status).toBe('correct')
    expect(guess[1].status).toBe('correct')
    expect(guess[2].status).toBe('correct')
    expect(guess[3].status).toBe('correct')
    expect(guess[4].status).toBe('correct')

    guess = correct.guess(new Melody('49 51 56 61 49'))
    expect(guess).toHaveLength(5)
    expect(guess[0].status).toBe('incorrect')
    expect(guess[1].status).toBe('incorrect')
    expect(guess[2].status).toBe('incorrect')
    expect(guess[3].status).toBe('incorrect')
    expect(guess[4].status).toBe('incorrect')

    guess = correct.guess(new Melody('48 48 48 51 60'))
    expect(guess).toHaveLength(5)
    expect(guess[0].status).toBe('correct')
    expect(guess[1].status).toBe('wrong-position')
    expect(guess[2].status).toBe('incorrect')
    expect(guess[3].status).toBe('incorrect')
    expect(guess[4].status).toBe('wrong-position')
  })
}
