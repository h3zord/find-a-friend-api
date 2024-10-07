import bcrypt from 'bcrypt'

import { OrganizationsRepository } from '../../repositories/contracts/organization-repository'
import { Organization } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/Invalid-credentials-error'

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
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = bcrypt.compareSync(
      password,
      organization.password_hash,
    )

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
