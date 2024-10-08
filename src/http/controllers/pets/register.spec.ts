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

describe('Register pet (e2e)', () => {
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
  })

  afterEach(async () => {
    await prisma.organization.deleteMany()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/pet/register').send({
      name: 'John Doe',
      type: 'DOG',
      ageInMonths: 12,
      color: 'Black',
      sex: 'MALE',
      organizationId: 'org-01',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register with wrong organization id', async () => {
    const response = await request(app.server).post('/pet/register').send({
      name: 'John Doe',
      type: 'DOG',
      ageInMonths: 12,
      color: 'Black',
      sex: 'MALE',
      organizationId: 'org-02',
    })

    expect(response.statusCode).toEqual(404)
    expect(response.body.message).toEqual('Organization not found!')
  })

  it('should not be able to register without filling any field', async () => {
    const response = await request(app.server).post('/pet/register').send({
      name: null,
      type: 'DOG',
      ageInMonths: 12,
      color: 'Black',
      sex: 'MALE',
      organizationId: 'org-01',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error!')
  })
})
