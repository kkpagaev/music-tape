import * as jwt from "jsonwebtoken"

export interface JwtPayload {
  userId: string
}

export const createJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, conf.JWT_SECRET, { expiresIn: "1d" })
}

export const verifyJwt = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, conf.JWT_SECRET) as JwtPayload
  } catch (e) {
    return null
  }
}
