import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register'
import { authenticateOrganization } from './authenticate'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organization/register', registerOrganization)
  app.post('/organization/authenticate', authenticateOrganization)
}
