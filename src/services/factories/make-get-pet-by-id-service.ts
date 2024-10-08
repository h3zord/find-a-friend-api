import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetPetByIdService } from '../pets/get-pet-by-id'

export function MakeGetPetByIdService() {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdService = new GetPetByIdService(petsRepository)

  return getPetByIdService
}
