import { getNotation, type Semitone } from './note'

export type Melody = Semitone[]
export type Status = 'correct' | 'wrong-position' | 'incorrect' | undefined
export type GuessResult = GuessedNote[]
export type GuessedNote = {
  semitone?: Semitone
  status?: Status
}

export const fromString = (melody: string): Melody =>
  melody.split(' ').map((note) => parseInt(note, 10))

export const isCorrect = (correct: Melody, guess: Melody): boolean => {
  if (guess.length != 5) return false

  for (let i = 0; i < 5; i++) {
    if (getNotation(guess[i]) !== getNotation(correct[i])) {
      return false
    }
  }
  return true
}

export const guess = (
  correct: Melody,
  guess: Melody,
  { submitted = false } = {},
): GuessResult => {
  if (!guess) return [{}, {}, {}, {}, {}]

  const notes: GuessResult = []
  const remainingMelodyNotes = correct.map((semitone) => semitone % 12)

  for (let i = 0; i < 5; i++) {
    const semitone = guess[i]

    if (typeof semitone === 'undefined') {
      notes[i] = {}
      continue
    }

    /// We don't care in which octave it is
    const noteSemitone = semitone % 12

    let status: Status
    if (submitted) {
      if (remainingMelodyNotes[i] === noteSemitone) {
        status = 'correct'
        remainingMelodyNotes[i] = undefined
      } else if (remainingMelodyNotes.includes(noteSemitone)) {
        status = 'wrong-position'
        remainingMelodyNotes[remainingMelodyNotes.indexOf(noteSemitone)] =
          undefined
      } else {
        status = 'incorrect'
      }
    }

    notes[i] = { semitone: semitone, status }
  }
  return notes
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('properly parses strings', () => {
    let exercise = fromString('1 3 5 3 1')
    expect(exercise).toHaveLength(5)

    expect(exercise[0]).toBe(1)
    expect(exercise[1]).toBe(3)
    expect(exercise[2]).toBe(5)
    expect(exercise[3]).toBe(3)
    expect(exercise[4]).toBe(1)

    exercise = fromString('48 52')
    expect(exercise).toHaveLength(2)
    expect(exercise[0]).toBe(48)
    expect(exercise[1]).toBe(52)
  })
  it('can evaluate guesses', () => {
    const correct = fromString('48 50 55 59 48')

    let guessResult = guess(correct, [48, 50, 55, 59, 48], { submitted: true })
    expect(guessResult).toHaveLength(5)
    expect(guessResult[0].status).toBe('correct')
    expect(guessResult[1].status).toBe('correct')
    expect(guessResult[2].status).toBe('correct')
    expect(guessResult[3].status).toBe('correct')
    expect(guessResult[4].status).toBe('correct')

    guessResult = guess(correct, [49, 51, 56, 61, 49], { submitted: true })
    expect(guessResult).toHaveLength(5)
    expect(guessResult[0].status).toBe('incorrect')
    expect(guessResult[1].status).toBe('incorrect')
    expect(guessResult[2].status).toBe('incorrect')
    expect(guessResult[3].status).toBe('incorrect')
    expect(guessResult[4].status).toBe('incorrect')

    guessResult = guess(correct, [48, 48, 48, 51, 59], { submitted: true })
    expect(guessResult).toHaveLength(5)
    expect(guessResult[0].status).toBe('correct')
    expect(guessResult[1].status).toBe('wrong-position')
    expect(guessResult[2].status).toBe('incorrect')
    expect(guessResult[3].status).toBe('incorrect')
    expect(guessResult[4].status).toBe('wrong-position')
  })
  it('evaluates guesses independent of octaves', () => {
    const correct = fromString('0 12 0 12 0')
    const guessResult = guess(correct, fromString('0 12 24 36 48'), {
      submitted: true,
    })

    console.log(guessResult)
    expect(guessResult).toHaveLength(5)
    expect(guessResult[0].status).toBe('correct')
    expect(guessResult[1].status).toBe('correct')
    expect(guessResult[2].status).toBe('correct')
    expect(guessResult[3].status).toBe('correct')
    expect(guessResult[4].status).toBe('correct')
  })
  it('doesnt include status if guess hasnt been submitted', () => {
    const correct = fromString('0 12 0 12 0')
    const guessResult = guess(correct, fromString('0 12 24 36 48'), {
      submitted: false,
    })
    expect(guessResult).toHaveLength(5)
    expect(guessResult[0].status).toBeUndefined()
    expect(guessResult[1].status).toBeUndefined()
    expect(guessResult[2].status).toBeUndefined()
    expect(guessResult[3].status).toBeUndefined()
    expect(guessResult[4].status).toBeUndefined()
  })
}
