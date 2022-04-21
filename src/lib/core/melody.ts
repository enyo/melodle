import type { Difficulty } from '$lib/stores/difficulty'
import { getNotation, type Semitone } from './note'

export type Melody = Semitone[]
export type Status =
  | 'correct'
  | 'wrong-position'
  | 'incorrect'
  | 'adjacent'
  | undefined
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

const _withoutOctave = (semitone: Semitone): Semitone =>
  semitone < 0 ? semitone + 12 : semitone % 12

export type GuessMode = 'position' | 'adjacent'

export const guess = (
  correct: Melody,
  guess: Melody,
  {
    difficulty,
    submitted = false,
    mode = 'adjacent',
  }: { difficulty: Difficulty; submitted?: boolean; mode?: GuessMode },
): GuessResult => {
  if (!guess) return [{}, {}, {}, {}, {}]

  // We don't care about the octave
  guess = guess.map(_withoutOctave)
  const remainingMelodyNotes = correct.map(_withoutOctave)

  const guessResult: GuessResult = []

  for (let i = 0; i < 5; i++) {
    guessResult[i] = guess[i] !== undefined ? { semitone: guess[i] } : {}
  }

  if (submitted) {
    // First handle all correct notes
    guess.forEach((semitone, i) => {
      if (remainingMelodyNotes[i] === semitone) {
        guessResult[i].status = 'correct'
        remainingMelodyNotes[i] = undefined
      }
    })
    switch (mode) {
      case 'position':
        // Now handle all wrong-position notes
        guess.forEach((semitone, i) => {
          if (
            guessResult[i].status === undefined &&
            remainingMelodyNotes.includes(semitone)
          ) {
            guessResult[i].status = 'wrong-position'
            remainingMelodyNotes[remainingMelodyNotes.indexOf(semitone)] =
              undefined
          }
        })
        break
      case 'adjacent':
        if (difficulty !== 'easy') {
          // Now handle all adjacent notes
          guess.forEach((semitone, i) => {
            if (
              remainingMelodyNotes[i] === semitone - 1 ||
              remainingMelodyNotes[i] === semitone + 1
            ) {
              guessResult[i].status = 'adjacent'
              remainingMelodyNotes[i] = undefined
            }
          })
        }
        break
    }
    // Now fill all other guesses with incorrect.
    guessResult
      .filter((guess) => guess.status === undefined)
      .forEach((guess) => (guess.status = 'incorrect'))
  }
  return guessResult
}
