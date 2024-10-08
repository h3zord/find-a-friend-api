import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationService } from '../organizations/register'

export function MakeRegisterOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerOrganizationService = new RegisterOrganizationService(
    organizationsRepository,
  )

  return registerOrganizationService
}
