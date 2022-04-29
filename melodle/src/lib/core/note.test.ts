import { expect, it } from 'vitest'
import { getName } from './note'

it('getNotation works', () => {
  expect(getName(0)).toBe('C')
  expect(getName(0, { octave: true })).toBe('C0')

  expect(getName(4)).toBe('E')
  expect(getName(4, { octave: true })).toBe('E0')

  expect(getName(48)).toBe('C')
  expect(getName(48, { octave: true })).toBe('C4')
})
