import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import apiDogs from '../api/dogs'
import type { Dog } from '../types/dog'
import { toDog } from '../utils/breed'
import { constants } from '../utils/constants'

async function fetchGalleryDogs(): Promise<{
  main: Dog
  thumbnails: Dog[]
}> {
  const [mainUrl, ...thumbnailUrls] = await apiDogs.getRandomImages(
    constants.gallery.thumbnailCount + 1,
  )

  return {
    main: toDog(mainUrl),
    thumbnails: thumbnailUrls.map(toDog),
  }
}

export function useDogGallery() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['dog-gallery'],
    queryFn: fetchGalleryDogs,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const [selectedDog, setSelectedDog] = useState<Dog | null>(null)

  const mainDog = selectedDog ?? data?.main ?? null

  const selectDog = useCallback((dog: Dog) => {
    setSelectedDog(dog)
  }, [])

  const resetSelection = useCallback(() => {
    setSelectedDog(null)
  }, [])

  const refreshGallery = useCallback(async () => {
    resetSelection()
    await refetch()
  }, [refetch, resetSelection])

  return {
    mainDog,
    thumbnails: data?.thumbnails ?? [],
    isLoading,
    isError,
    error,
    isFetching,
    refreshGallery,
    selectDog,
  }
}
