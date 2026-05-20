import type { FavoriteDog } from '../types/dog'
import { constants } from './constants'

export function loadFavorites(): FavoriteDog[] {
  try {
    const raw = localStorage.getItem(constants.storage.favoritesKey)
    if (!raw) return []
    const parsed = JSON.parse(raw) as FavoriteDog[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveFavorites(favorites: FavoriteDog[]): void {
  localStorage.setItem(constants.storage.favoritesKey, JSON.stringify(favorites))
}

export function createFavoriteId(dog: FavoriteDog['imageUrl']): string {
  return dog
}
