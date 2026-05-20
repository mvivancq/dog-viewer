import { useCallback, useEffect, useRef, useState } from 'react'
import type { Dog } from '../types/dog'
import { loadFavorites, saveFavorites } from '../utils/favorites-storage'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Dog[]>(() => loadFavorites())
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    saveFavorites(favorites)
  }, [favorites])

  const addFavorite = useCallback((dog: Dog) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === dog.id)) return prev
      return [...prev, dog]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites],
  )

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
