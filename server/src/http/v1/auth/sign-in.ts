import { RouteOptions } from "fastify"
import { SignInSchema, SignIn } from "../../../schema/sign-in.schema"
import { createJwt } from "../../../services/auth/jwt"
import { findUserByEmail } from "../../../services/user/repository"
import { UnauthorizedException } from "../../exceptions/unauthorized.exception"
import * as bcrypt from "bcrypt"

export const options: RouteOptions = {
  method: "POST",
  url: "/sign-in",
  schema: {
    body: SignInSchema,
  },
  handler: async (req, rep) => {
    const { email, password } = req.body as SignIn

    const user = await findUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException()
    }

    const accessToken = createJwt({
      userId: user.id,
    })

    return rep.code(201).send({
      accessToken,
    })
  },
}
