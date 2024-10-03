import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/contracts/pets-repository'

interface CreatePetServiceRequest {
  name: string
  type: 'CAT' | 'DOG' | 'BIRD'
  ageInMonths: number
  color: string
  sex: 'MALE' | 'FEMALE'
  organizationId: string
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
    organizationId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      name,
      type,
      age_in_months: ageInMonths,
      color,
      sex,
      organization_id: organizationId,
    })

    return { pet }
  }
}
