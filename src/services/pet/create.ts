import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/pets-repository'

interface CreatePetServiceRequest {
  name: string
  type: 'CAT' | 'DOG' | 'BIRD'
  ageInMonths: number
  color: string
  sex: 'MALE' | 'FEMALE'
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    type,
    ageInMonths,
    color,
    sex,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      name,
      type,
      age_in_months: ageInMonths,
      color,
      sex,
    })

    return { pet }
  }
}
