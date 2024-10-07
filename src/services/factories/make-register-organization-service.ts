import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationService } from '../organization/register'

export function MakeRegisterOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerOrganizationService = new RegisterOrganizationService(
    organizationsRepository,
  )

  return registerOrganizationService
}
