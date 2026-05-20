import axios, { type Axios, type AxiosError } from 'axios'
import type { BreedsList, DogApiResponse } from '../types/dog'
import { constants } from '../utils/constants'

/*
 * API client for the Dog API
 * https://dog.ceo/dog-api/documentation
 */

class APIDogs {
  private axiosInstance: Axios

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: constants.dogApi.baseUrl,
    })

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('[Dog API]', error.message)
        return Promise.reject(error)
      },
    )
  }

  private async get<T>(path: string): Promise<T> {
    const { data } = await this.axiosInstance.get<DogApiResponse<T>>(path)

    if (data.status !== 'success') {
      throw new Error(`Dog API returned status: ${data.status}`)
    }

    return data.message
  }

  getAllBreeds() {
    return this.get<BreedsList>('/breeds/list/all')
  }

  getRandomImage() {
    return this.get<string>('/breeds/image/random')
  }

  getRandomImages(count: number) {
    return this.get<string[]>(`/breeds/image/random/${count}`)
  }

  getRandomBreedImage(breed: string) {
    return this.get<string>(`/breed/${breed}/images/random`)
  }
}

const apiDogs = new APIDogs()

export default apiDogs
