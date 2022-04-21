import { expect, it } from 'vitest'
import { getNotation } from './note'

it('getNotation works', () => {
  expect(getNotation(0)).toBe('C')
  expect(getNotation(0, { octave: true })).toBe('C0')

  expect(getNotation(4)).toBe('E')
  expect(getNotation(4, { octave: true })).toBe('E0')

  expect(getNotation(48)).toBe('C')
  expect(getNotation(48, { octave: true })).toBe('C4')
})
