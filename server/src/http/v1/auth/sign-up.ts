import { RouteOptions } from "fastify"
import { SignUp, SignUpSchema } from "../../../schema/sign-up.schema"
import { signUp } from "../../../services/auth/sign-up"

export const options: RouteOptions = {
  method: "POST",
  url: "/sign-up",
  schema: {
    body: SignUpSchema,
  },
  handler: async (req, rep) => {
    const body = req.body as SignUp
    const user = await signUp(body)

    return rep.code(201).send({
      user,
    })
  },
}
