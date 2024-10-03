import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { OrganizationNotFound } from '../errors/organization-not-found'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new CreatePetService(petsRepository, organizationRepository)

    await organizationRepository.create({
      id: 'org-01',
      name: 'Fake Org',
      email: 'test@org.com',
      password: '123456',
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
