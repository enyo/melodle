import { get, writable } from 'svelte/store'
import { getGuessCount, type StoredBoard } from './board'

const _key = 'stats'

type Stats = {
  lastIndex: number
  playedGames: number
  winPercentage: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
}

const _default = (): Stats => ({
  lastIndex: -2,
  playedGames: 0,
  winPercentage: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [],
})

const _getStats = (): Stats => {
  if (typeof localStorage === 'undefined') return _default()

  try {
    const stored = localStorage.getItem(_key)
    if (!stored) throw 'No stats stored'
    return JSON.parse(stored)
  } catch (e) {
    console.warn(e)
    return _default()
  }
}

const _stats = writable<Stats>(_getStats())

export const stats = {
  subscribe: _stats.subscribe,
  addNew: (board: StoredBoard): void => {
    _stats.update((stats) => {
      if (stats.lastIndex === board.index - 1) {
        stats.currentStreak++
      } else {
        stats.currentStreak = 1
      }
      if (stats.currentStreak > stats.maxStreak) {
        stats.maxStreak = stats.currentStreak
      }
      stats.winPercentage =
        (stats.winPercentage * stats.playedGames +
          (board.state === 'success' ? 1 : 0)) /
        (stats.playedGames + 1)
      stats.playedGames++
      stats.lastIndex = board.index
      const guessCountIdx = getGuessCount(board) - 1
      stats.guessDistribution[guessCountIdx] ??= 0
      stats.guessDistribution[guessCountIdx]++
      return stats
    })
  },
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('handles addNew properly', () => {
    expect(get(_stats)).toMatchObject(_default())
    stats.addNew({
      index: 2,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [{ melody: [], submitted: true, played: true }],
    })
    expect(get(_stats)).toMatchObject({
      lastIndex: 2,
      playedGames: 1,
      winPercentage: 1,
      currentStreak: 1,
      maxStreak: 1,
      guessDistribution: [1],
    })
    stats.addNew({
      index: 3,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
      ],
    })
    expect(get(_stats)).toMatchObject({
      lastIndex: 3,
      playedGames: 2,
      winPercentage: 1,
      currentStreak: 2,
      maxStreak: 2,
      guessDistribution: [1, undefined, 1],
    })
    stats.addNew({
      index: 4,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
      ],
    })
    expect(get(_stats)).toMatchObject({
      lastIndex: 4,
      playedGames: 3,
      winPercentage: 1,
      currentStreak: 3,
      maxStreak: 3,
      guessDistribution: [1, undefined, 2],
    })
    stats.addNew({
      index: 5,
      melody: [0, 1, 2, 3, 4],
      state: 'failed',
      guesses: [{ melody: [], submitted: true, played: true }],
    })
    expect(get(_stats)).toMatchObject({
      lastIndex: 5,
      playedGames: 4,
      winPercentage: 0.75,
      currentStreak: 4,
      maxStreak: 4,
      guessDistribution: [2, undefined, 2],
    })
    stats.addNew({
      index: 7,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [{ melody: [], submitted: true, played: true }],
    })
    expect(get(_stats)).toMatchObject({
      lastIndex: 7,
      playedGames: 5,
      winPercentage: 0.8,
      currentStreak: 1,
      maxStreak: 4,
      guessDistribution: [3, undefined, 2],
    })
  })
}
