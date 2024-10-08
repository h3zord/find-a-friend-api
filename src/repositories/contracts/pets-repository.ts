import { Prisma, Pet } from '@prisma/client'

export interface FetchPetsInCityParams {
  city: string
  type?: 'DOG' | 'CAT' | 'BIRD'
  ageInMonths?: number
  color?: string
  sex?: 'MALE' | 'FEMALE'
}

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getPetById(id: string): Promise<Pet | null>
  fetchPetsInCity(searchParams: FetchPetsInCityParams): Promise<Pet[]>
}
