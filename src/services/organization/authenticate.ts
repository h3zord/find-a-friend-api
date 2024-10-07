import bcrypt from 'bcrypt'

import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'
import { Organization } from '@prisma/client'
import { InvalidCredentials } from '../errors/Invalid-credentials'

interface AuthenticateOrganizationServiceRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationServiceResponse {
  organization: Organization
}

export class AuthenticateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationServiceRequest): Promise<AuthenticateOrganizationServiceResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentials()
    }

    const doestPasswordMatches = bcrypt.compareSync(
      password,
      organization.password_hash,
    )

    if (!doestPasswordMatches) {
      throw new InvalidCredentials()
    }

    return {
      organization,
    }
  }
}
