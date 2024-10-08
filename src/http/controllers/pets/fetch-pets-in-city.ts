import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFetchPetsInCityService } from '../../../services/factories/make-fetch-pets-in-city-service'

export async function fetchPetsInCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsInCityQueryParamsSchema = z.object({
    city: z.string(),
    type: z.enum(['DOG', 'CAT', 'BIRD']).optional(),
    ageInMonths: z.coerce.number().optional(),
    color: z.string().optional(),
    sex: z.enum(['MALE', 'FEMALE']).optional(),
  })

  const { city, type, ageInMonths, color, sex } =
    fetchPetsInCityQueryParamsSchema.parse(request.query)

  const makeFetchPetsInCityService = MakeFetchPetsInCityService()

  const { petList } = await makeFetchPetsInCityService.execute({
    city,
    type,
    ageInMonths,
    color,
    sex,
  })

  return reply.status(200).send({ petList })
}
