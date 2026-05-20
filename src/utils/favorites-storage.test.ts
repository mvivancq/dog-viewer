import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { constants } from './constants'
import { loadFavorites, saveFavorites } from './favorites-storage'

function createLocalStorageMock() {
  const store = new Map<string, string>()

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
  }
}

describe('favorites-storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns empty list when storage is empty', () => {
    expect(loadFavorites()).toEqual([])
  })

  it('round-trips valid favorites', () => {
    const favorites = [
      {
        imageUrl: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
        breed: 'pug',
        id: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
      },
    ]

    saveFavorites(favorites)
    expect(loadFavorites()).toEqual(favorites)
  })

  it('ignores corrupted JSON', () => {
    localStorage.setItem(constants.storage.favoritesKey, '{not json')
    expect(loadFavorites()).toEqual([])
  })

  it('filters invalid items from stored JSON', () => {
    localStorage.setItem(
      constants.storage.favoritesKey,
      JSON.stringify([
        {
          imageUrl: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
          breed: 'pug',
          id: 'https://images.dog.ceo/breeds/pug/n02110958_6676.jpg',
        },
        { imageUrl: 'incomplete' },
      ]),
    )

    expect(loadFavorites()).toHaveLength(1)
  })
})
