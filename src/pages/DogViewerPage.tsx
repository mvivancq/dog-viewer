import { FavoriteItem } from '../components/favorites/FavoriteItem'
import { FavoritesPanel } from '../components/favorites/FavoritesPanel'
import { MainImage } from '../components/main-image/MainImage'
import { ThumbnailGrid } from '../components/thumbnails/ThumbnailGrid'
import { ThumbnailItem } from '../components/thumbnails/ThumbnailItem'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useDogGallery } from '../hooks/useDogGallery'
import { useFavorites } from '../hooks/useFavorites'

export function DogViewerPage() {
  const {
    mainDog,
    thumbnails,
    isLoading,
    isError,
    selectDog,
  } = useDogGallery()

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <LoadingSpinner label="Loading dogs..." />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="py-12 text-center text-red-600" role="alert">
          Could not load dogs. Please refresh the page.
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dog Viewer</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-8">
          <MainImage
            dog={mainDog}
            isFavorite={mainDog ? isFavorite(mainDog.imageUrl) : false}
            onAddFavorite={
              mainDog ? () => addFavorite(mainDog) : undefined
            }
          />

          <section>
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Random breeds
            </h3>
            {thumbnails.length === 0 ? (
              <p className="text-sm text-slate-500">
                No thumbnails available yet.
              </p>
            ) : (
              <ThumbnailGrid>
                {thumbnails.map((dog) => (
                  <ThumbnailItem
                    key={dog.imageUrl}
                    dog={dog}
                    isSelected={dog.imageUrl === mainDog?.imageUrl}
                    onSelect={selectDog}
                  />
                ))}
              </ThumbnailGrid>
            )}
          </section>
        </div>

        <FavoritesPanel>
          {favorites.length === 0 ? (
            <p className="text-sm text-slate-500">
              No favorites yet. Add the main image using the button above.
            </p>
          ) : (
            <ul className="flex flex-col gap-1 overflow-y-auto">
              {favorites.map((favorite) => (
                <li key={favorite.id}>
                  <FavoriteItem
                    favorite={favorite}
                    isSelected={favorite.imageUrl === mainDog?.imageUrl}
                    onSelect={selectDog}
                    onRemove={removeFavorite}
                  />
                </li>
              ))}
            </ul>
          )}
        </FavoritesPanel>
      </div>
    </main>
  )
}
