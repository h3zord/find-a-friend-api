import { FastifyInstance } from 'fastify'
import { registerPet } from './register'
import { getPetById } from './get-pet-by-id'
import { fetchPetsInCity } from './fetch-pets-in-city'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet/register', registerPet)
  app.get('/pet/:id', getPetById)
  app.get('/pet', fetchPetsInCity)
}
