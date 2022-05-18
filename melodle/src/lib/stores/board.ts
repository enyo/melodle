import { sendEvent } from '$lib/core/analytics'
import { melodies as melodiesEasy } from '$lib/core/melodies_easy'
import { melodies as melodiesHard } from '$lib/core/melodies_hard'
import { isCorrect, type Melody } from '$lib/core/melody'
import type { Semitone } from '$lib/core/note'
import { stats } from '$lib/stores/stats'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays/index.js'
import { get, writable } from 'svelte/store'
import { difficulty, type Difficulty } from './difficulty'

type MelodyGuess = {
  melody: Melody
  submitted: boolean
  played: boolean // Whether the user has played the melody
}
export type BoardState = 'playing' | 'success' | 'failed'

export type StoredBoard = {
  difficulty: Difficulty
  index: number
  melody: Melody
  guesses: MelodyGuess[]
  state: BoardState
}

const firstMelodle = new Date(2022, 3, 19)

const _keys: { [key in Difficulty]: string } = {
  easy: 'board_easy',
  hard: 'board',
}

export const getStoredBoard = (difficulty: Difficulty): StoredBoard => {
  let melodies: number[][]
  switch (difficulty) {
    case 'easy':
      melodies = melodiesEasy
      break
    case 'hard':
      melodies = melodiesHard
      break
  }
  // Determine todays melody and repeate after 1000 days.
  const index =
    Math.max(0, differenceInCalendarDays(new Date(), firstMelodle)) %
    melodies.length

  const melody = melodies[index].map((note) => note + 12 * 4)

  let storedBoard: StoredBoard
  if (typeof localStorage !== 'undefined') {
    const readData = localStorage.getItem(_keys[difficulty])
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
        if (
          typeof parsed['difficulty'] !== 'string' ||
          // Added this because I changed from 'medium' to 'hard'.
          parsed['difficulty'] !== difficulty
        )
          parsed['difficulty'] = difficulty
        storedBoard = parsed
      } catch (e) {
        console.warn(e)
      }
    }
  }

  if (!storedBoard) {
    storedBoard = {
      difficulty: difficulty,
      index: index,
      melody: melody,
      guesses: [],
      state: 'playing',
    }
  }
  return storedBoard
}
const _board = writable<StoredBoard>(getStoredBoard(get(difficulty)))

_board.subscribe((board) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_keys[board.difficulty], JSON.stringify(board))
  }
})
difficulty.subscribe((difficulty) => {
  if (difficulty !== get(_board).difficulty) {
    _board.set(getStoredBoard(difficulty))
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
    sendEvent(`success-${board.difficulty}`)
    board.state = 'success'
  } else if (board.guesses.filter((guess) => guess.submitted).length === 6) {
    sendEvent(`failed-${board.difficulty}`)
    board.state = 'failed'
  } else {
    board.state = 'playing'
  }
  if (board.state !== 'playing') {
    stats.addNew(board)
  }
}
const _triggerUpdate = () => _board.update((board) => board)

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
