import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { env } from './env'
import { organizationRoutes } from './http/controllers/organizations/routes'
import { petRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(organizationRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error!', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error!' })
})
