import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'

interface CreateOrganizationServiceRequest {
  name: string
  email: string
  password: string
  description?: string
  phone: string
  adress: string
  city: string
}

interface CreateOrganizationServiceResponse {
  organization: Organization
}

export class CreateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    description,
    phone,
    adress,
    city,
  }: CreateOrganizationServiceRequest): Promise<CreateOrganizationServiceResponse> {
    const organization = await this.organizationsRepository.create({
      name,
      email,
      password,
      description,
      phone,
      adress,
      city,
    })

    return { organization }
  }
}
