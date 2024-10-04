import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository'
import {
  FetchPetsInCityParams,
  PetsRepository,
} from '../contracts/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(
    private organizationRepository: InMemoryOrganizationsRepository,
  ) {}

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

  async fetchPetsInCity({
    city,
    type,
    ageInMonths,
    color,
    sex,
  }: FetchPetsInCityParams) {
    const orgList = this.organizationRepository.items.filter(
      (org) => org.city.toLocaleLowerCase() === city.toLocaleLowerCase(),
    )

    const petList = this.items
      .filter((pet) => orgList.some((org) => org.id === pet.organization_id))
      .filter((pet) => (ageInMonths ? pet.age_in_months === ageInMonths : true))
      .filter((pet) => (sex ? pet.sex === sex : true))
      .filter((pet) => (type ? pet.type === type : true))
      .filter((pet) =>
        color
          ? pet.color.toLocaleLowerCase() === color.toLocaleLowerCase()
          : true,
      )

    return petList
  }

  async getPetById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    return pet || null
  }
}
