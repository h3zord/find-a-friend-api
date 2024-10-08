import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeGetPetByIdService } from '../../../services/factories/make-get-pet-by-id-service'
import { PetNotFound } from '../../../services/errors/pet-not-found'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const getPetByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetByIdParamsSchema.parse(request.params)

  try {
    const makeGetPetByIdService = MakeGetPetByIdService()

    const { pet } = await makeGetPetByIdService.execute(id)

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof PetNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
