import differenceInCalendarDays from 'date-fns/differenceInCalendarDays/index.js'
import { get, writable } from 'svelte/store'
import { melodies } from '$lib/melodies'
import { isCorrect, type Melody } from '$lib/melody'
import type { Semitone } from '$lib/note'
import { stats } from '$lib/stores/stats'

type MelodyGuess = {
  melody: Melody
  submitted: boolean
  played: boolean // Whether the user has played the melody
}
type BoardState = 'playing' | 'success' | 'failed'

export type StoredBoard = {
  index: number
  melody: Melody
  guesses: MelodyGuess[]
  state: BoardState
}

const firstMelodle = new Date(2022, 3, 19)

const index = Math.min(
  melodies.length,
  Math.max(0, differenceInCalendarDays(new Date(), firstMelodle)),
)
const melody = melodies[index].map((note) => note + 12 * 4)

const _key = 'board'

let storedBoard: StoredBoard

if (typeof localStorage !== 'undefined') {
  const readData = localStorage.getItem(_key)
  if (readData) {
    try {
      const parsed = JSON.parse(readData)
      if (parsed.index !== index) {
        throw 'Wrong index'
      }
      if (
        !Array.isArray(parsed.melody) ||
        parsed.melody.length !== melody.length ||
        parsed.melody[0] !== melody[0] ||
        parsed.melody[1] !== melody[1] ||
        parsed.melody[2] !== melody[2] ||
        parsed.melody[3] !== melody[3] ||
        parsed.melody[4] !== melody[4]
      ) {
        throw 'Wrong melody'
      }
      storedBoard = parsed
    } catch (e) {
      console.warn(e)
      typeof localStorage !== 'undefined'
    }
  }
}

if (!storedBoard) {
  storedBoard = {
    index: index,
    melody: melody,
    guesses: [],
    state: 'playing',
  }
}
const _board = writable<StoredBoard>(storedBoard)

_board.subscribe((board) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_key, JSON.stringify(board))
  }
})

export const getGuessCount = (board: StoredBoard): number =>
  board.guesses.filter((guess) => guess.submitted).length

export const getCurrentGuess = (board?: StoredBoard): MelodyGuess | null => {
  board ??= get(_board)
  if (board.state !== 'playing') return null

  const currentGuess = board.guesses[board.guesses.length - 1]
  if (!currentGuess || currentGuess.submitted) {
    if (board.guesses.length === 6) throw 'This shouldnt happen'
    // Create a new guess object
    const guess = { melody: [], submitted: false, played: false }
    board.guesses.push(guess)
    return guess
  } else {
    return currentGuess
  }
}
const updateBoardState = () => {
  const board = get(_board)
  if (
    board.guesses
      .filter((guess) => guess.submitted)
      .find((guess) => isCorrect(board.melody, guess.melody))
  ) {
    board.state = 'success'
  } else if (board.guesses.filter((guess) => guess.submitted).length === 6) {
    board.state = 'failed'
  } else {
    board.state = 'playing'
  }
  if (board.state !== 'playing') {
    stats.addNew(board)
  }
}
const _triggerUpdate = () => _board.set(get(_board))

export const board = {
  subscribe: _board.subscribe,

  addGuessNote: (semitone: Semitone) => {
    const currentGuess = getCurrentGuess()
    if (!currentGuess || currentGuess.melody.length >= 5) return
    currentGuess.melody.push(semitone)

    _triggerUpdate()
  },
  deleteGuess: () => {
    const currentGuess = getCurrentGuess()
    if (!currentGuess) return
    currentGuess.melody.pop()
    _triggerUpdate()
  },
  sharp: () => {
    const currentGuess = getCurrentGuess()
    if (!currentGuess || currentGuess.melody.length === 0) return
    currentGuess.melody[currentGuess.melody.length - 1] += 1
    _triggerUpdate()
  },
  flat: () => {
    const currentGuess = getCurrentGuess()
    if (!currentGuess || currentGuess.melody.length === 0) return
    const idx = currentGuess.melody.length - 1
    currentGuess.melody[idx] -= 1
    if (currentGuess[idx] < 0) {
      currentGuess[idx] += 12
    }
    _triggerUpdate()
  },
  submit: () => {
    const currentGuess = getCurrentGuess()

    if (!currentGuess || currentGuess.melody.length < 5) {
      return
    }
    currentGuess.submitted = true

    updateBoardState()
    _triggerUpdate()
  },
  melodyPlayed: () => {
    const currentGuess = getCurrentGuess()
    if (!currentGuess) return
    currentGuess.played = true
    _triggerUpdate()
  },
}
