import { FastifyRequest, RouteOptions } from "fastify"
import { z } from "zod"

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
  handler: async ({ body }: FastifyRequest<{ Body: Body }>, rep) => {
    return rep.code(200).send({
      foo: body.id,
    })
  },
}
