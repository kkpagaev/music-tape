import { RouteOptions } from "fastify"
import { z } from "zod"
import { PASSWORD_MIN_LENGTH } from "../../../const"

const BodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: "POST",
  url: "/sign-up",
  schema: {
    body: BodySchema,
  },
  handler: async (req, rep) => {
    return rep.code(200).send({
      message: "Hello World",
    })
  },
}
