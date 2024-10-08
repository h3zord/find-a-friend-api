import bcrypt from 'bcrypt'

import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'
import { OrganizationAlreadyExists } from '../errors/organization-already-exists'

interface RegisterOrganizationServiceRequest {
  name: string
  email: string
  password: string
  description?: string
  phone: string
  adress: string
  city: string
}

interface RegisterOrganizationServiceResponse {
  organization: Organization
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    description,
    phone,
    adress,
    city,
  }: RegisterOrganizationServiceRequest): Promise<RegisterOrganizationServiceResponse> {
    const userWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrganizationAlreadyExists()
    }

    const passwordHash = bcrypt.hashSync(password, 6)

    const organization = await this.organizationsRepository.register({
      name,
      email,
      password_hash: passwordHash,
      description,
      phone,
      adress,
      city,
    })

    return { organization }
  }
}
