import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/contracts/pets-repository'
import { PetNotFound } from '../errors/pet-not-found'

interface GetPetByIdServiceResponse {
  pet: Pet
}

export class GetPetByIdService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<GetPetByIdServiceResponse> {
    const pet = await this.petsRepository.getPetById(id)

    if (!pet) {
      throw new PetNotFound()
    }

    return { pet }
  }
}
