import request from 'supertest'
import bcrypt from 'bcrypt'

import { app } from '../../../app'
import { prisma } from '../../../lib/prisma'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

describe('Get pet by id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await prisma.organization.create({
      data: {
        id: 'org-01',
        name: 'Fake Org',
        email: 'test01@org.com',
        password_hash: bcrypt.hashSync('123456', 6),
        description: 'Org description',
        phone: '99 999999999',
        adress: 'Fake street',
        city: 'Fake city',
      },
    })

    await prisma.pet.create({
      data: {
        id: 'pet-01',
        name: 'John Doe',
        type: 'DOG',
        age_in_months: 12,
        color: 'Black',
        sex: 'MALE',
        organization_id: 'org-01',
      },
    })
  })

  afterEach(async () => {
    await prisma.organization.deleteMany()
  })

  it('should be able to get a pet by id', async () => {
    const response = await request(app.server).get('/pet/pet-01')

    expect(response.statusCode).toEqual(200)
  })

  it('should not be able to get a pet with wrong id', async () => {
    const response = await request(app.server).get('/pet/pet-02')

    expect(response.statusCode).toEqual(404)
    expect(response.body.message).toEqual('Pet not found!')
  })
})
