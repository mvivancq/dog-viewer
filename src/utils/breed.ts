/**
 * Extrae el nombre de la raza desde una URL de imagen de dog.ceo.
 * Ej: https://images.dog.ceo/breeds/bulldog/french/n02108915.jpg → "bulldog french"
 */
export function parseBreedFromImageUrl(imageUrl: string): string {
  const match = imageUrl.match(/\/breeds\/([^/]+(?:\/[^/]+)?)\//i)
  if (!match?.[1]) return 'Unknown breed'

  return match[1].replace(/\//g, ' ')
}

export function toDog(imageUrl: string) {
  return {
    imageUrl,
    breed: parseBreedFromImageUrl(imageUrl),
  }
}
