import { get } from 'svelte/store'
import { expect, it } from 'vitest'
import { stats } from './stats'

it('handles addNew properly', () => {
  expect(get(stats)).toMatchObject({
    lastIndex: -2,
    playedGames: 0,
    winPercentage: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [],
  })
  stats.addNew({
    difficulty: 'medium',
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
    difficulty: 'medium',
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
    difficulty: 'medium',
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
    difficulty: 'medium',
    index: 5,
    melody: [0, 1, 2, 3, 4],
    state: 'failed',
    guesses: [{ melody: [], submitted: true, played: true }],
  })
  expect(get(stats)).toMatchObject({
    lastIndex: 5,
    playedGames: 4,
    winPercentage: 0.75,
    currentStreak: 4,
    maxStreak: 4,
    guessDistribution: [2, undefined, 2],
  })
  stats.addNew({
    difficulty: 'medium',
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
    maxStreak: 4,
    guessDistribution: [3, undefined, 2],
  })
})
