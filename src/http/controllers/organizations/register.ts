import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeRegisterOrganizationService } from '../../../services/factories/make-register-organization-service'
import { OrganizationAlreadyExists } from '../../../services/errors/organization-already-exists'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    description: z.string().optional(),
    phone: z.string(),
    adress: z.string(),
    city: z.string(),
  })

  const { name, email, password, description, phone, adress, city } =
    registerOrganizationBodySchema.parse(request.body)

  try {
    const registerOrganizationService = MakeRegisterOrganizationService()

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
    if (error instanceof OrganizationAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
