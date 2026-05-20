import type { Dog } from '../../types/dog'

interface ThumbnailItemProps {
  dog: Dog
  isSelected?: boolean
  onSelect: (dog: Dog) => void
}

export function ThumbnailItem({ dog, isSelected, onSelect }: ThumbnailItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(dog)}
      className={`group flex flex-col gap-2 text-left transition-transform duration-200 hover:scale-105 ${
        isSelected ? 'ring-2 ring-slate-800 ring-offset-2 rounded-lg' : ''
      }`}
      aria-label={`View ${dog.breed}`}
      aria-pressed={isSelected}
    >
      <div className="overflow-hidden rounded-lg bg-slate-100">
        <img
          src={dog.imageUrl}
          alt={dog.breed}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
      </div>
      <span className="truncate text-xs font-medium capitalize text-slate-600">
        {dog.breed}
      </span>
    </button>
  )
}
