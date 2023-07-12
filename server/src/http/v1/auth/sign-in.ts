import { RouteOptions } from "fastify"
import { SignIn, SignInSchema } from "../../../schema/sing-in.schema"
import { singIn } from "../../../services/auth/sign-in"

export const options: RouteOptions = {
  method: "POST",
  url: "/sign-in",
  schema: {
    body: SignInSchema,
  },
  handler: async (req, rep) => {
    const body = req.body as SignIn
    const token = await singIn(body)

    return rep.code(201).send({
      accessToken: token
    })
  },
}
