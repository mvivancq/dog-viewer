import { FavoriteItem } from '../components/favorites/FavoriteItem'
import { FavoritesPanel } from '../components/favorites/FavoritesPanel'
import { MainImage } from '../components/main-image/MainImage'
import { ThumbnailGrid } from '../components/thumbnails/ThumbnailGrid'
import { ThumbnailItem } from '../components/thumbnails/ThumbnailItem'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useDogGallery } from '../hooks/useDogGallery'
import { useFavorites } from '../hooks/useFavorites'
import { getErrorMessage } from '../utils/error-message'

export function DogViewerPage() {
  const {
    mainDog,
    thumbnails,
    isLoading,
    isError,
    error,
    isFetching,
    refreshGallery,
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
          Could not load dogs: {getErrorMessage(error)}
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => void refreshGallery()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Try again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Dog Viewer</h1>
        <button
          type="button"
          onClick={() => void refreshGallery()}
          disabled={isFetching}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetching ? 'Loading new dogs...' : 'Load new dogs'}
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div
          className={`space-y-8 transition-opacity ${isFetching ? 'opacity-60' : ''}`}
          aria-busy={isFetching}
        >
          <MainImage
            dog={mainDog}
            isFavorite={mainDog ? isFavorite(mainDog.id) : false}
            onAddFavorite={mainDog ? () => addFavorite(mainDog) : undefined}
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
                    key={dog.id}
                    dog={dog}
                    isSelected={dog.id === mainDog?.id}
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
              {favorites.map((dog) => (
                <li key={dog.id}>
                  <FavoriteItem
                    dog={dog}
                    isSelected={dog.id === mainDog?.id}
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
