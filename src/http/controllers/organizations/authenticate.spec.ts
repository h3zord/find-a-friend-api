import request from 'supertest'
import bcrypt from 'bcrypt'

import { prisma } from '../../../lib/prisma'
import { app } from '../../../app'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

describe('Authenticate (e2e)', () => {
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

  it('should be able to authenticate', async () => {
    const response = await request(app.server)
      .post('/organization/authenticate')
      .send({
        email: 'test01@org.com',
        password: '123456',
      })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    const response = await request(app.server)
      .post('/organization/authenticate')
      .send({
        email: 'test02@org.com',
        password: '123456',
      })

    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Invalid credentials!')
  })

  it('should not be able to authenticate with wrong password', async () => {
    const response = await request(app.server)
      .post('/organization/authenticate')
      .send({
        email: 'test01@org.com',
        password: '123123',
      })

    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Invalid credentials!')
  })
})
