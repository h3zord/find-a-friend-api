import { Prisma, Organization } from '@prisma/client'

export interface OrganizationsRepository {
  register(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
