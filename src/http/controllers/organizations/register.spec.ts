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

describe('Register organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await prisma.organization.create({
      data: {
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
    const response = await request(app.server)
      .post('/organization/register')
      .send({
        name: 'Fake Org',
        email: 'test02@org.com',
        password: '123456',
        description: 'Org description',
        phone: '99 999999999',
        adress: 'Fake street',
        city: 'Fake city',
      })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register with same email', async () => {
    const response = await request(app.server)
      .post('/organization/register')
      .send({
        name: 'Fake Org',
        email: 'test01@org.com',
        password: '123456',
        description: 'Org description',
        phone: '99 999999999',
        adress: 'Fake street',
        city: 'Fake city',
      })

    expect(response.statusCode).toEqual(409)
    expect(response.body.message).toEqual('Organization already exists!')
  })

  it('should not be able to register without filling any field', async () => {
    const response = await request(app.server)
      .post('/organization/register')
      .send({
        name: null,
        email: 'test02@org.com',
        password: '123456',
        description: 'Org description',
        phone: '99 999999999',
        adress: 'Fake street',
        city: 'Fake city',
      })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error!')
  })
})
