import type { Dog } from '../types/dog'

export function isDog(value: unknown): value is Dog {
  if (!value || typeof value !== 'object') return false

  const record = value as Record<string, unknown>

  return (
    typeof record.imageUrl === 'string' &&
    record.imageUrl.length > 0 &&
    typeof record.breed === 'string' &&
    typeof record.id === 'string' &&
    record.id.length > 0
  )
}

export function parseStoredDogs(value: unknown): Dog[] {
  if (!Array.isArray(value)) return []
  return value.filter(isDog)
}
