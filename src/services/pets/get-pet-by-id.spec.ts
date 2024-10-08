import bcrypt from 'bcrypt'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { GetPetByIdService } from './get-pet-by-id'
import { PetNotFound } from '../errors/pet-not-found'

let organizationRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdService

describe('Get pet by id service', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationRepository)

    sut = new GetPetByIdService(petsRepository)

    await organizationRepository.register({
      id: 'org-01',
      name: 'Fake Org',
      email: 'test@org.com',
      password_hash: bcrypt.hashSync('123456', 6),
      description: 'Org description',
      phone: '99 999999999',
      adress: 'Fake street',
      city: 'Fake city',
    })

    await petsRepository.register({
      id: 'pet-01',
      name: 'John Doe',
      type: 'DOG',
      age_in_months: 12,
      color: 'Black',
      sex: 'MALE',
      organization_id: 'org-01',
    })
  })

  it('should to get a pet', async () => {
    const { pet } = await sut.execute('pet-01')

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should throw an error when organization id does not exist', async () => {
    await expect(() => sut.execute('pet-02')).rejects.toBeInstanceOf(
      PetNotFound,
    )
  })
})
