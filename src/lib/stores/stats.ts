import { getGuessCount, type StoredBoard } from '$lib/stores/board'
import { get, writable } from 'svelte/store'
import { difficulty, type Difficulty } from './difficulty'

const _keys: { [key in Difficulty]: string } = {
  easy: 'stats_easy',
  hard: 'stats',
}

type Stats = {
  difficulty: Difficulty
  lastIndex: number
  playedGames: number
  winPercentage: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
}

const _default = (difficulty: Difficulty): Stats => ({
  difficulty: difficulty,
  lastIndex: -2,
  playedGames: 0,
  winPercentage: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [],
})

const _getStoredStats = (difficulty: Difficulty): Stats => {
  if (typeof localStorage === 'undefined') return _default(difficulty)

  try {
    const stored = localStorage.getItem(_keys[difficulty])
    if (!stored) throw `No stats stored for ${difficulty}`
    const parsed = JSON.parse(stored)
    if (
      typeof parsed['difficulty'] !== 'string' ||
      // Added this because I changed from 'medium' to 'hard'.
      parsed['difficulty'] !== difficulty
    ) {
      parsed.difficulty = difficulty
    }
    return parsed
  } catch (e) {
    console.warn(e)
  }

  return _default(difficulty)
}

const _stats = writable<Stats>(_getStoredStats(get(difficulty)))
_stats.subscribe((stats) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_keys[stats.difficulty], JSON.stringify(stats))
  }
})
difficulty.subscribe((difficulty) => {
  if (difficulty !== get(_stats).difficulty) {
    _stats.set(_getStoredStats(difficulty))
  }
})

export const stats = {
  subscribe: _stats.subscribe,
  /// Only visible for testing
  reset: (difficulty: Difficulty) => {
    _stats.set(_default(difficulty))
  },
  addNew: (board: StoredBoard): void => {
    _stats.update((stats) => {
      if (stats.lastIndex === board.index - 1 && board.state === 'success') {
        stats.currentStreak++
      } else {
        stats.currentStreak = board.state === 'success' ? 1 : 0
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
