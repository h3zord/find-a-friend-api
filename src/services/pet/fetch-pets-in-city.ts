import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/contracts/pets-repository'

interface FetchPetsInCityServiceRequest {
  city: string
}

interface FetchPetsInCityServiceResponse {
  petList: Pet[]
}

export class FetchPetsInCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsInCityServiceRequest): Promise<FetchPetsInCityServiceResponse> {
    const petList = await this.petsRepository.fetchPetsInCity(city)

    return { petList }
  }
}
