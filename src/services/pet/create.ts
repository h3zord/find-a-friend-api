import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/contracts/pets-repository'
import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'
import { OrganizationNotFound } from '../errors/organization-not-found'

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
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    type,
    ageInMonths,
    color,
    sex,
    organizationId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const doesOrganizationExist =
      await this.organizationsRepository.findById(organizationId)

    if (!doesOrganizationExist) {
      throw new OrganizationNotFound()
    }

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
