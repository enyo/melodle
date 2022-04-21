import { writable } from 'svelte/store'

const _key = 'difficulty'

export const difficulties = ['easy', 'medium'] as const
export type Difficulty = typeof difficulties[number]

const _isDifficulty = (difficulty: unknown): difficulty is Difficulty =>
  difficulties.includes(difficulty as Difficulty)

const _getStoredDifficulty = (): Difficulty => {
  const defaultDifficulty = 'medium'
  if (typeof localStorage === 'undefined') return defaultDifficulty

  const difficulty = localStorage.getItem(_key)
  if (_isDifficulty(difficulty)) return difficulty

  return defaultDifficulty
}

export const difficulty = writable<Difficulty>(_getStoredDifficulty())
difficulty.subscribe((difficulty) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_key, difficulty)
  }
})
