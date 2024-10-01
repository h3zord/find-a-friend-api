import 'dotenv/config'
import { z } from 'zod'

const environmentSchema = z.object({
  PORT: z.coerce.number(),
})

const _env = environmentSchema.parse(process.env)

export const env = _env
