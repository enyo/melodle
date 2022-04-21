import { getGuessCount, type StoredBoard } from '$lib/stores/board'
import { writable } from 'svelte/store'

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
_stats.subscribe((stats) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_key, JSON.stringify(stats))
  }
})

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
