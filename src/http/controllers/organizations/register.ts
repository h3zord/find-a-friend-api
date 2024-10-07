import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeRegisterService } from '../../../services/factories/make-register-service'
import { UserAlreadyExists } from '../../../services/errors/user-already-exists'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    description: z.string().optional(),
    phone: z.string(),
    adress: z.string(),
    city: z.string(),
  })

  const { name, email, password, description, phone, adress, city } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrganizationService = MakeRegisterService()

    await registerOrganizationService.execute({
      name,
      email,
      password,
      description,
      phone,
      adress,
      city,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
