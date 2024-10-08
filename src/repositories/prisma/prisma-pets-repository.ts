import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {
  FetchPetsInCityParams,
  PetsRepository,
} from '../contracts/pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        type: data.type,
        age_in_months: data.age_in_months,
        color: data.color,
        sex: data.sex,
        organization_id: data.organization_id,
      },
    })

    return pet
  }

  async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async fetchPetsInCity(searchParams: FetchPetsInCityParams) {
    const petList = await prisma.pet.findMany({
      where: {
        type: searchParams.type,
        age_in_months: searchParams.ageInMonths,
        sex: searchParams.sex,
        color: {
          contains: searchParams.color,
          mode: 'insensitive',
        },

        organization: {
          city: {
            contains: searchParams.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return petList
  }
}
