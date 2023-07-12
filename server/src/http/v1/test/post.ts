import { FastifyRequest, RouteOptions } from "fastify"
import { z } from "zod"
import { requireAuth } from "../../hooks/require-auth"

const BodySchema = z.object({
  id: z.enum(["foo", "bar"]),
})

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: "POST",
  url: "/",
  schema: {
    body: BodySchema,
  },
  preHandler: [requireAuth],
  handler: async ({ body }: FastifyRequest<{ Body: Body }>, rep) => {
    return rep.code(200).send({
      foo: body.id,
    })
  },
}
