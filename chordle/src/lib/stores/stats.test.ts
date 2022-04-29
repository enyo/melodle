import { get } from 'svelte/store'
import { expect, it, describe } from 'vitest'
import type { BoardState } from './board'
import { stats } from './stats'

describe('addNew()', () => {
  it('starts with a fresh stats object', () => {
    expect(get(stats)).toMatchObject({
      difficulty: 'easy',
      lastIndex: -2,
      playedGames: 0,
      winPercentage: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [],
    })
  })
  it('handles addNew properly', () => {
    stats.reset('hard')
    stats.addNew({
      difficulty: 'hard',
      index: 2,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [{ melody: [], submitted: true, played: true }],
    })
    expect(get(stats)).toMatchObject({
      lastIndex: 2,
      playedGames: 1,
      winPercentage: 1,
      currentStreak: 1,
      maxStreak: 1,
      guessDistribution: [1],
    })
    stats.addNew({
      difficulty: 'hard',
      index: 3,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
      ],
    })
    expect(get(stats)).toMatchObject({
      lastIndex: 3,
      playedGames: 2,
      winPercentage: 1,
      currentStreak: 2,
      maxStreak: 2,
      guessDistribution: [1, undefined, 1],
    })
    stats.addNew({
      difficulty: 'hard',
      index: 4,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
        { melody: [], submitted: true, played: true },
      ],
    })
    expect(get(stats)).toMatchObject({
      lastIndex: 4,
      playedGames: 3,
      winPercentage: 1,
      currentStreak: 3,
      maxStreak: 3,
      guessDistribution: [1, undefined, 2],
    })
    stats.addNew({
      difficulty: 'hard',
      index: 5,
      melody: [0, 1, 2, 3, 4],
      state: 'failed',
      guesses: [{ melody: [], submitted: true, played: true }],
    })
    expect(get(stats)).toMatchObject({
      lastIndex: 5,
      playedGames: 4,
      winPercentage: 0.75,
      currentStreak: 0,
      maxStreak: 3,
      guessDistribution: [2, undefined, 2],
    })
    stats.addNew({
      difficulty: 'hard',
      index: 7,
      melody: [0, 1, 2, 3, 4],
      state: 'success',
      guesses: [{ melody: [], submitted: true, played: true }],
    })
    expect(get(stats)).toMatchObject({
      lastIndex: 7,
      playedGames: 5,
      winPercentage: 0.8,
      currentStreak: 1,
      maxStreak: 3,
      guessDistribution: [3, undefined, 2],
    })
  })

  const _addGame = (index: number, state: BoardState) => {
    stats.addNew({
      difficulty: 'hard',
      index: index,
      melody: [0, 1, 2, 3, 4],
      state: state,
      guesses: [{ melody: [], submitted: true, played: true }],
    })
  }

  it('resets a streak when the challenge was not solved', () => {
    stats.reset('hard')
    _addGame(7, 'success')
    _addGame(8, 'success')
    _addGame(9, 'success')
    expect(get(stats).currentStreak).toBe(3)
    expect(get(stats).maxStreak).toBe(3)
    _addGame(10, 'failed')
    expect(get(stats).currentStreak).toBe(0)
    expect(get(stats).maxStreak).toBe(3)
  })
  it('resets a streak when a day is missed', () => {
    stats.reset('hard')
    _addGame(7, 'success')
    _addGame(8, 'success')
    _addGame(9, 'success')
    expect(get(stats).currentStreak).toBe(3)
    expect(get(stats).maxStreak).toBe(3)
    _addGame(11, 'success')
    expect(get(stats).currentStreak).toBe(1)
    expect(get(stats).maxStreak).toBe(3)
  })
})
