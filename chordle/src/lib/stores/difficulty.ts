import { writable } from 'svelte/store'

const _key = 'difficulty'

export const difficulties = ['easy', 'medium', 'hard'] as const
export type Difficulty = typeof difficulties[number]

const _isDifficulty = (difficulty: unknown): difficulty is Difficulty =>
  difficulties.includes(difficulty as Difficulty)

const _getStoredDifficulty = (): Difficulty => {
  const defaultDifficulty = 'easy'
  if (typeof localStorage === 'undefined') return defaultDifficulty

  let difficulty = localStorage.getItem(_key)
  if (difficulty === 'medium') difficulty = 'hard'
  if (_isDifficulty(difficulty)) return difficulty

  return defaultDifficulty
}

export const difficulty = writable<Difficulty>(_getStoredDifficulty())
difficulty.subscribe((difficulty) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(_key, difficulty)
  }
})
