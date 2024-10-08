import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/contracts/pets-repository'
import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'
import { OrganizationNotFound } from '../errors/organization-not-found'

interface RegisterPetServiceRequest {
  name: string
  type: 'CAT' | 'DOG' | 'BIRD'
  ageInMonths: number
  color: string
  sex: 'MALE' | 'FEMALE'
  organizationId: string
}

interface RegisterPetServiceResponse {
  pet: Pet
}

export class RegisterPetService {
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
  }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
    const doesOrganizationExist =
      await this.organizationsRepository.findById(organizationId)

    if (!doesOrganizationExist) {
      throw new OrganizationNotFound()
    }

    const pet = await this.petsRepository.register({
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
