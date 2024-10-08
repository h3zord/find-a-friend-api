import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { FetchPetsInCityService } from '../pets/fetch-pets-in-city'

export function MakeFetchPetsInCityService() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsInCityService = new FetchPetsInCityService(petsRepository)

  return fetchPetsInCityService
}
