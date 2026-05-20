import { describe, expect, it } from 'vitest'
import { isDog, parseStoredDogs } from './validate-dog'

describe('isDog', () => {
  it('accepts valid dog objects', () => {
    expect(
      isDog({
        imageUrl: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
        breed: 'pug',
        id: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
      }),
    ).toBe(true)
  })

  it('rejects invalid shapes', () => {
    expect(isDog(null)).toBe(false)
    expect(isDog({ imageUrl: '', breed: 'pug', id: 'x' })).toBe(false)
    expect(isDog({ imageUrl: 'x', breed: 'pug' })).toBe(false)
    expect(isDog('not-an-object')).toBe(false)
  })
})

describe('parseStoredDogs', () => {
  it('filters out invalid entries', () => {
    const valid = {
      imageUrl: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
      breed: 'pug',
      id: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
    }

    expect(
      parseStoredDogs([valid, { imageUrl: 'bad' }, null, 'string']),
    ).toEqual([valid])
  })

  it('returns empty array for non-arrays', () => {
    expect(parseStoredDogs({})).toEqual([])
    expect(parseStoredDogs(null)).toEqual([])
  })
})
