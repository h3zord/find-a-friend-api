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

describe('Fetch pets in city (e2e)', () => {
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
        name: 'John Doe',
        type: 'DOG',
        age_in_months: 12,
        color: 'Black',
        sex: 'MALE',
        organization_id: 'org-01',
      },
    })

    await prisma.pet.create({
      data: {
        name: 'John Doe',
        type: 'DOG',
        age_in_months: 12,
        color: 'White',
        sex: 'MALE',
        organization_id: 'org-01',
      },
    })

    await prisma.pet.create({
      data: {
        name: 'John Doe',
        type: 'DOG',
        age_in_months: 12,
        color: 'Gray',
        sex: 'MALE',
        organization_id: 'org-01',
      },
    })
  })

  afterEach(async () => {
    await prisma.organization.deleteMany()
  })

  it('should be able to fetch all pets in city', async () => {
    const response = await request(app.server).get('/pet?city=fake+city')

    expect(response.body.petList.length).toEqual(3)
  })

  it('should be able to fetch all male pets with black color', async () => {
    const response = await request(app.server).get(
      '/pet?city=fake+city&color=black&sex=MALE',
    )

    expect(response.body.petList.length).toEqual(1)
  })

  it('should not be able to fetch all pets without provide a city', async () => {
    const response = await request(app.server).get('/pet?color=black')

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error!')
  })
})
