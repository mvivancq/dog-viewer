import type { Dog } from '../../types/dog'

interface MainImageProps {
  dog: Dog | null
  isLoading?: boolean
  isFavorite?: boolean
  onAddFavorite?: () => void
}

export function MainImage({
  dog,
  isLoading,
  isFavorite,
  onAddFavorite,
}: MainImageProps) {
  if (isLoading) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-slate-100">
        <p className="text-sm text-slate-500">Loading main image...</p>
      </div>
    )
  }

  if (!dog) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-slate-100">
        <p className="text-sm text-slate-500">No image selected</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl bg-slate-100">
        <img
          src={dog.imageUrl}
          alt={dog.breed}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold capitalize text-slate-800">
          {dog.breed}
        </h2>
        {onAddFavorite && (
          <button
            type="button"
            onClick={onAddFavorite}
            disabled={isFavorite}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFavorite ? 'In favorites' : 'Add to favorites'}
          </button>
        )}
      </div>
    </div>
  )
}
