import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(petsRepository)
  })

  it('should to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'John Doe',
      type: 'DOG',
      ageInMonths: 12,
      color: 'Black',
      sex: 'MALE',
      organizationId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
