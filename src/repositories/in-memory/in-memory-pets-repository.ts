import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../contracts/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      type: data.type,
      age_in_months: data.age_in_months,
      color: data.color,
      sex: 'MALE',
      organization_id: data.organization_id,
      update_at: new Date(),
      created_at: new Date(),
    } as Pet

    this.items.push(pet)

    return pet
  }
}
