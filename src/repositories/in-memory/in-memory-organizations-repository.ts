import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../contracts/organization-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async register(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      description: data.description ?? '',
      phone: data.phone,
      adress: data.adress,
      city: data.city,
      update_at: new Date(),
      created_at: new Date(),
    } as Organization

    this.items.push(organization)

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((org) => org.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((org) => org.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
