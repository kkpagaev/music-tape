import { UnauthorizedException } from "../../http/exceptions/unauthorized.exception"
import { SignIn } from "../../schema/sing-in.schema"
import { findUserByEmail } from "../user/repository"
import { createJwt } from "./jwt"
import * as bcrypt from "bcrypt"

export const singIn = async ({ email, password }: SignIn) => {
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

  return accessToken
}
