import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeRegisterPetService } from '../../../services/factories/make-register-pet-service'
import { OrganizationNotFound } from '../../../services/errors/organization-not-found'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string().min(3),
    type: z.enum(['CAT', 'DOG', 'BIRD']),
    ageInMonths: z.coerce.number(),
    color: z.string(),
    sex: z.enum(['MALE', 'FEMALE']),
    organizationId: z.string(),
  })

  const { name, type, ageInMonths, color, sex, organizationId } =
    registerPetBodySchema.parse(request.body)

  try {
    const registerPetService = MakeRegisterPetService()

    await registerPetService.execute({
      name,
      type,
      ageInMonths,
      color,
      sex,
      organizationId,
    })
  } catch (error) {
    if (error instanceof OrganizationNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
