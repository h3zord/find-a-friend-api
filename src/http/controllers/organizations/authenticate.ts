import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentials } from '../../../services/errors/Invalid-credentials'
import { MakeAuthenticateOrganizationService } from '../../../services/factories/make-authenticate-organization-service'

export async function authenticateOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  )

  try {
    const authenticateOrganizationService =
      MakeAuthenticateOrganizationService()

    const { organization } = await authenticateOrganizationService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: organization.id,
      },
    })

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
