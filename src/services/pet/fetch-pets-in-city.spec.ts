import bcrypt from 'bcrypt'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { FetchPetsInCityService } from './fetch-pets-in-city'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: FetchPetsInCityService

describe('Fetch all pets in one city service', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationRepository)

    sut = new FetchPetsInCityService(petsRepository)

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

    await petsRepository.create({
      name: 'John Doe',
      type: 'DOG',
      age_in_months: 12,
      color: 'Black',
      sex: 'MALE',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      name: 'John Doe',
      type: 'DOG',
      age_in_months: 12,
      color: 'White',
      sex: 'MALE',
      organization_id: 'org-01',
    })

    await petsRepository.create({
      name: 'John Doe',
      type: 'DOG',
      age_in_months: 12,
      color: 'Black',
      sex: 'MALE',
      organization_id: 'org-02',
    })
  })

  it('should return the correct number of pets in the city', async () => {
    const { petList } = await sut.execute({ city: 'fake city' })

    expect(petList.length).toEqual(2)
  })

  it('should return the correct number of pets filtering by feature', async () => {
    const { petList } = await sut.execute({ city: 'fake city', color: 'black' })

    expect(petList.length).toEqual(1)
  })
})
