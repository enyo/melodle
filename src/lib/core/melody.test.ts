import { expect, it } from 'vitest'
import { fromString, guess, type Melody } from './melody'

it('properly parses strings', () => {
  let exercise = fromString('1 3 5 3 1')
  expect(exercise).toHaveLength(5)

  expect(exercise[0]).toBe(1)
  expect(exercise[1]).toBe(3)
  expect(exercise[2]).toBe(5)
  expect(exercise[3]).toBe(3)
  expect(exercise[4]).toBe(1)

  exercise = fromString('48 52')
  expect(exercise).toHaveLength(2)
  expect(exercise[0]).toBe(48)
  expect(exercise[1]).toBe(52)
})
it('can evaluate guesses', () => {
  const correct = fromString('48 50 55 59 48')

  let guessResult = guess(correct, [48, 50, 55, 59, 48], { submitted: true })
  expect(guessResult).toHaveLength(5)
  expect(guessResult[0].status).toBe('correct')
  expect(guessResult[1].status).toBe('correct')
  expect(guessResult[2].status).toBe('correct')
  expect(guessResult[3].status).toBe('correct')
  expect(guessResult[4].status).toBe('correct')

  guessResult = guess(correct, [49, 51, 56, 61, 49], { submitted: true })
  expect(guessResult).toHaveLength(5)
  expect(guessResult[0].status).toBe('incorrect')
  expect(guessResult[1].status).toBe('incorrect')
  expect(guessResult[2].status).toBe('incorrect')
  expect(guessResult[3].status).toBe('incorrect')
  expect(guessResult[4].status).toBe('incorrect')

  guessResult = guess(correct, [48, 48, 48, 51, 59], { submitted: true })
  expect(guessResult).toHaveLength(5)
  expect(guessResult[0].status).toBe('correct')
  expect(guessResult[1].status).toBe('wrong-position')
  expect(guessResult[2].status).toBe('incorrect')
  expect(guessResult[3].status).toBe('incorrect')
  expect(guessResult[4].status).toBe('wrong-position')
})
it('handles multiple notes correctly', () => {
  const correct: Melody = [11, 0, 10, 8, 0]

  // G# (8) appears twice, but the first should be incorrect, and the second
  // correct.
  const guessResult = guess(correct, fromString('8 11 10 8 0'), {
    submitted: true,
  })
  expect(guessResult[0].status).toBe('incorrect')
  expect(guessResult[1].status).toBe('wrong-position')
  expect(guessResult[2].status).toBe('correct')
  expect(guessResult[3].status).toBe('correct')
  expect(guessResult[4].status).toBe('correct')
})
it('evaluates guesses independent of octaves', () => {
  const correct = fromString('0 12 0 12 0')
  const guessResult = guess(correct, fromString('0 12 24 36 48'), {
    submitted: true,
  })

  expect(guessResult).toHaveLength(5)
  expect(guessResult[0].status).toBe('correct')
  expect(guessResult[1].status).toBe('correct')
  expect(guessResult[2].status).toBe('correct')
  expect(guessResult[3].status).toBe('correct')
  expect(guessResult[4].status).toBe('correct')
})
it('doesnt include status if guess hasnt been submitted', () => {
  const correct = fromString('0 12 0 12 0')
  const guessResult = guess(correct, fromString('0 12 24 36 48'), {
    submitted: false,
  })
  expect(guessResult).toHaveLength(5)
  expect(guessResult[0].status).toBeUndefined()
  expect(guessResult[1].status).toBeUndefined()
  expect(guessResult[2].status).toBeUndefined()
  expect(guessResult[3].status).toBeUndefined()
  expect(guessResult[4].status).toBeUndefined()
})
