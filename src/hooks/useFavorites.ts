import { useCallback, useEffect, useState } from 'react'
import type { Dog, FavoriteDog } from '../types/dog'
import {
  createFavoriteId,
  loadFavorites,
  saveFavorites,
} from '../utils/favorites-storage'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteDog[]>(() => loadFavorites())

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const addFavorite = useCallback((dog: Dog) => {
    setFavorites((prev) => {
      const id = createFavoriteId(dog.imageUrl)
      if (prev.some((f) => f.id === id)) return prev
      return [...prev, { ...dog, id }]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const isFavorite = useCallback(
    (imageUrl: string) =>
      favorites.some((f) => f.id === createFavoriteId(imageUrl)),
    [favorites],
  )

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
