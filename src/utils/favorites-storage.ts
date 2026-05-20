import type { Dog } from '../types/dog'
import { constants } from './constants'
import { parseStoredDogs } from './validate-dog'

export function loadFavorites(): Dog[] {
  try {
    const raw = localStorage.getItem(constants.storage.favoritesKey)
    if (!raw) return []
    return parseStoredDogs(JSON.parse(raw))
  } catch {
    return []
  }
}

export function saveFavorites(favorites: Dog[]): void {
  localStorage.setItem(constants.storage.favoritesKey, JSON.stringify(favorites))
}
