import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationService } from '../organization/authenticate'

export function MakeAuthenticateOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOrganizationService = new AuthenticateOrganizationService(
    organizationsRepository,
  )

  return authenticateOrganizationService
}
