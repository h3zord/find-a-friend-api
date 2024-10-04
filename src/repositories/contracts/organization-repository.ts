import { Prisma, Organization } from '@prisma/client'

export interface OrganizationsRepository {
  register(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findById(id: string): Promise<Organization | null>
}
