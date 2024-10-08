import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/contracts/pets-repository'

interface FetchPetsInCityServiceRequest {
  city: string
  type?: 'DOG' | 'CAT' | 'BIRD'
  ageInMonths?: number
  color?: string
  sex?: 'MALE' | 'FEMALE'
}

interface FetchPetsInCityServiceResponse {
  petList: Pet[]
}

export class FetchPetsInCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    type,
    ageInMonths,
    color,
    sex,
  }: FetchPetsInCityServiceRequest): Promise<FetchPetsInCityServiceResponse> {
    const petList = await this.petsRepository.fetchPetsInCity({
      city,
      type,
      ageInMonths,
      color,
      sex,
    })

    return { petList }
  }
}
