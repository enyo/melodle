import { get, writable } from 'svelte/store'
import { Melody } from './melody'
import { Note } from './note'

type MelodyGuess = {
  melody: Melody
  submitted: boolean
  played: boolean // Whether the user has played the melody
}
type BoardState = 'playing' | 'success' | 'failed'

type StoredBoard = {
  index: number
  melody: Melody
  guesses: MelodyGuess[]
  state: BoardState
}
function _rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
const _randNote = () => _rand(12 * 4, 12 * 5)
const _board = writable<StoredBoard>({
  index: 2,
  melody: new Melody([
    _randNote(),
    _randNote(),
    _randNote(),
    _randNote(),
    _randNote(),
  ]),
  guesses: [],
  state: 'playing',
})

const _getLastNote = () => {
  const board = get(_board)
  const currentGuess = board.guesses[board.guesses.length - 1]
  if (!currentGuess || currentGuess.submitted) {
    return
  }
  return currentGuess.melody.notes[currentGuess.melody.notes.length - 1]
}
const updateBoardState = (board: StoredBoard) => {
  if (
    board.guesses
      .filter((guess) => guess.submitted)
      .find((guess) => board.melody.isCorrect(guess.melody))
  ) {
    board.state = 'success'
  } else if (board.guesses.filter((guess) => guess.submitted).length === 6) {
    board.state = 'failed'
  } else {
    board.state = 'playing'
  }
}
export const board = {
  subscribe: _board.subscribe,

  addGuessNote: (semitone) => {
    const board = get(_board)
    if (board.state !== 'playing') return
    let currentGuess = board.guesses[board.guesses.length - 1]

    if (!currentGuess || currentGuess.submitted) {
      currentGuess = { melody: new Melody([]), submitted: false, played: false }
      board.guesses.push(currentGuess)
    }

    if (currentGuess && currentGuess.melody.notes.length >= 5) {
      return
    }

    currentGuess.melody.notes.push(new Note(semitone))

    // Trigger change detection
    _board.set(board)
  },
  deleteGuess: () => {
    const board = get(_board)
    if (board.state !== 'playing') return
    const currentGuess = board.guesses[board.guesses.length - 1]
    if (!currentGuess || currentGuess.submitted) {
      return
    }
    currentGuess.melody.notes.pop()
    // Trigger change detection
    _board.set(board)
  },
  sharp: () => {
    const board = get(_board)
    if (board.state !== 'playing') return
    const note = _getLastNote()
    if (!note) return
    note.semitone = note.semitone + 1
    // Trigger change detection
    _board.set(board)
  },
  flat: () => {
    const board = get(_board)
    if (board.state !== 'playing') return
    const note = _getLastNote()
    if (!note) return
    note.semitone = note.semitone - 1
    if (note.semitone < 0) {
      note.semitone += 12
    }
    // Trigger change detection
    _board.set(board)
  },
  submit: () => {
    const board = get(_board)
    if (board.state !== 'playing') return
    const currentGuess = board.guesses[board.guesses.length - 1]
    if (
      !currentGuess ||
      currentGuess.submitted ||
      currentGuess.melody.notes.length < 5
    ) {
      return
    }
    currentGuess.submitted = true

    updateBoardState(board)
    // Trigger change detection
    _board.set(board)
  },
}
