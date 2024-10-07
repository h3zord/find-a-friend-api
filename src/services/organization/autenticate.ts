import bcrypt from 'bcrypt'

import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'
import { Organization } from '@prisma/client'
import { InvalidCredentials } from '../errors/Invalid-credentials'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  organization: Organization
}

export class AuthenticateService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
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
