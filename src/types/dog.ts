export interface DogApiResponse<T> {
  status: string
  message: T
}

export interface Dog {
  imageUrl: string
  breed: string
}

export interface FavoriteDog extends Dog {
  id: string
}

export type BreedsList = Record<string, string[]>

export type SubBreedsList = string[]
