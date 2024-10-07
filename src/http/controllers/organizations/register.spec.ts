import request from 'supertest'

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await request(app.server).post('/organizations/register').send({
      name: 'Fake Org',
      email: 'test01@org.com',
      password: '123456',
      description: 'Org description',
      phone: '99 999999999',
      adress: 'Fake street',
      city: 'Fake city',
    })
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/organizations/register')
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
      .post('/organizations/register')
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
    expect(response.body.message).toEqual('User already exists!')
  })
})
