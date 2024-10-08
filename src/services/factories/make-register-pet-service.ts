import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { RegisterPetService } from '../pets/register'

export function MakeRegisterPetService() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()

  const registerPetService = new RegisterPetService(
    petsRepository,
    organizationsRepository,
  )

  return registerPetService
}
