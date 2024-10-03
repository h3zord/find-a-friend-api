import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      type: data.type,
      age_in_months: data.age_in_months,
      created_at: new Date(),
    } as Pet

    this.items.push(pet)

    return pet
  }
}
