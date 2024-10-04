import { Prisma, Pet } from '@prisma/client'

export interface FetchPetsInCityParams {
  city: string
  type?: 'DOG' | 'CAT' | 'BIRD'
  ageInMonths?: number
  color?: string
  sex?: 'MALE' | 'FEMALE'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchPetsInCity(data: FetchPetsInCityParams): Promise<Pet[]>
  getPetById(id: string): Promise<Pet | null>
}
