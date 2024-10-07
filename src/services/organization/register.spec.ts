import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationService } from './register'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationService

describe('Create Organization Service', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationService(organizationsRepository)
  })

  it('should to create a new Organization', async () => {
    const { organization } = await sut.execute({
      name: 'Fake Org',
      email: 'test@org.com',
      password: '123456',
      description: 'Org description',
      phone: '99 999999999',
      adress: 'Fake street',
      city: 'Fake city',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
