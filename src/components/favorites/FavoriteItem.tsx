import type { Dog } from '../../types/dog'

interface FavoriteItemProps {
  dog: Dog
  isSelected?: boolean
  onSelect: (dog: Dog) => void
  onRemove: (id: string) => void
}

export function FavoriteItem({
  dog,
  isSelected,
  onSelect,
  onRemove,
}: FavoriteItemProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg p-2 transition-colors ${
        isSelected ? 'bg-slate-100' : 'hover:bg-slate-50'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(dog)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        aria-label={`View favorite ${dog.breed}`}
      >
        <img
          src={dog.imageUrl}
          alt={dog.breed}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-md object-cover"
        />
        <span className="truncate text-sm font-medium capitalize text-slate-700">
          {dog.breed}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onRemove(dog.id)}
        className="shrink-0 px-2 py-1 text-xs text-red-600 hover:underline"
        aria-label={`Remove ${dog.breed} from favorites`}
      >
        Remove
      </button>
    </div>
  )
}
