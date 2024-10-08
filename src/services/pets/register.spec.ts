import bcrypt from 'bcrypt'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { RegisterPetService } from './register'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { OrganizationNotFound } from '../errors/organization-not-found'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterPetService

describe('Register pet service', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)

    sut = new RegisterPetService(petsRepository, organizationsRepository)

    await organizationsRepository.register({
      id: 'org-01',
      name: 'Fake Org',
      email: 'test@org.com',
      password_hash: bcrypt.hashSync('123456', 6),
      description: 'Org description',
      phone: '99 999999999',
      adress: 'Fake street',
      city: 'Fake city',
    })
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

  it('should throw an error when organization id does not exist', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        type: 'DOG',
        ageInMonths: 12,
        color: 'Black',
        sex: 'MALE',
        organizationId: 'org-02',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFound)
  })
})
