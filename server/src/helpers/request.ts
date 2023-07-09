import { FastifyRequest } from "fastify"
import { z, ZodObject, ZodRawShape } from "zod"

export type Req<TB extends ZodObject<ZodRawShape>> = FastifyRequest<{
  Body: z.infer<TB>
}>
