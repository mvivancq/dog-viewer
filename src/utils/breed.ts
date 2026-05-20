import type { Dog } from '../types/dog'

/**
 * Extracts breed name from a dog.ceo image URL.
 * e.g. https://images.dog.ceo/breeds/bulldog/french/n02108915.jpg → "bulldog french"
 */
export function parseBreedFromImageUrl(imageUrl: string): string {
  const match = imageUrl.match(/\/breeds\/([^/]+(?:\/[^/]+)?)\//i)
  if (!match?.[1]) return 'Unknown breed'

  return match[1].replace(/\//g, ' ')
}

export function toDog(imageUrl: string): Dog {
  return {
    imageUrl,
    breed: parseBreedFromImageUrl(imageUrl),
    id: imageUrl,
  }
}
