import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationService } from '../organization/register'

export function MakeRegisterService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerService = new RegisterOrganizationService(
    organizationsRepository,
  )

  return registerService
}
