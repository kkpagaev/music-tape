import { RouteOptions } from "fastify"
import { z } from "zod"
import { PASSWORD_MIN_LENGTH } from "../../../const"
import { createJwt } from "../../../services/auth/jwt"

const BodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .strict()

type Body = z.infer<typeof BodySchema>

export const options: RouteOptions = {
  method: "POST",
  url: "/sign-in",
  schema: {
    body: BodySchema,
  },
  handler: async (req, rep) => {
    const accessToken = createJwt({
      userId: "test",
    })
    return rep.code(201).send({
      accessToken
    })
  },
}
