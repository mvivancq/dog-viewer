import { describe, expect, it } from 'vitest'
import { parseBreedFromImageUrl, toDog } from './breed'

describe('parseBreedFromImageUrl', () => {
  it('extracts single-breed name from URL', () => {
    const url =
      'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg'

    expect(parseBreedFromImageUrl(url)).toBe('hound-afghan')
  })

  it('extracts sub-breed with space separator', () => {
    const url =
      'https://images.dog.ceo/breeds/bulldog/french/n02108915.jpg'

    expect(parseBreedFromImageUrl(url)).toBe('bulldog french')
  })

  it('returns Unknown breed for invalid URLs', () => {
    expect(parseBreedFromImageUrl('https://example.com/dog.jpg')).toBe(
      'Unknown breed',
    )
  })
})

describe('toDog', () => {
  it('maps image URL to Dog with id equal to imageUrl', () => {
    const url =
      'https://images.dog.ceo/breeds/retriever/golden/n02099601_1004.jpg'

    expect(toDog(url)).toEqual({
      imageUrl: url,
      breed: 'retriever golden',
      id: url,
    })
  })
})
