import bcrypt from 'bcrypt'

import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateService } from './autenticate'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { InvalidCredentialsError } from '../errors/Invalid-credentials-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateService(organizationRepository)

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
  })

  it('should be able to authenticate', async () => {
    const { organization } = await sut.execute({
      email: 'test@org.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@org.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
