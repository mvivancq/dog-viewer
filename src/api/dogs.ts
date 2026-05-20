import axios, { type Axios } from 'axios'
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
  }

  async getAllBreeds() {
    try {
      const { data } = await this.axiosInstance.get<
        DogApiResponse<BreedsList>
      >('/breeds/list/all')
      return data.message
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getRandomImage() {
    try {
      const { data } = await this.axiosInstance.get<DogApiResponse<string>>(
        '/breeds/image/random',
      )
      return data.message
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getRandomImages(count: number) {
    try {
      const { data } = await this.axiosInstance.get<DogApiResponse<string[]>>(
        `/breeds/image/random/${count}`,
      )
      return data.message
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getRandomBreedImage(breed: string) {
    try {
      const { data } = await this.axiosInstance.get<DogApiResponse<string>>(
        `/breed/${breed}/images/random`,
      )
      return data.message
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const apiDogs = new APIDogs()

export default apiDogs
