import { RouteOptions } from "fastify"
import { z } from "zod"
import { Req } from "../../../helpers/request"

const Schema = z.object({
  id: z.enum(["foo", "bar"]),
})

export const options: RouteOptions = {
  method: "POST",
  url: "/",
  schema: {
    body: Schema,
  },
  handler: async ({ body }: Req<typeof Schema>, rep) => {
    return rep.code(200).send({
      foo: body.id,
    })
  },
}
