import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { OrganizationsRepository } from '../contracts/organization-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async register(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        description: data.description ?? '',
        phone: data.phone,
        adress: data.adress,
        city: data.city,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }
}
