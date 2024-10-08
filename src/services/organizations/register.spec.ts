import bcrypt from 'bcrypt'

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationService } from './register'
import { OrganizationAlreadyExists } from '../errors/organization-already-exists'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationService

describe('Register organization service', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationService(organizationsRepository)

    await organizationsRepository.register({
      id: 'org-01',
      name: 'Fake Org',
      email: 'test01@org.com',
      password_hash: bcrypt.hashSync('123456', 6),
      description: 'Org description',
      phone: '99 999999999',
      adress: 'Fake street',
      city: 'Fake city',
    })
  })

  it('should to create a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'Fake Org',
      email: 'test02@org.com',
      password: '123456',
      description: 'Org description',
      phone: '99 999999999',
      adress: 'Fake street',
      city: 'Fake city',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not to create a new organization with same email', async () => {
    await expect(() =>
      sut.execute({
        name: 'Fake Org',
        email: 'test01@org.com',
        password: '123456',
        description: 'Org description',
        phone: '99 999999999',
        adress: 'Fake street',
        city: 'Fake city',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })
})
