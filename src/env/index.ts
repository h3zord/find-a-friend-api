import 'dotenv/config'

import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
})

const _env = environmentSchema.parse(process.env)

export const env = _env
