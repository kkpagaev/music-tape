import { User } from "@prisma/client"
import { ConflictException } from "../../http/exceptions/conflict-exception"
import { SignUp } from "../../schema/sign-up.schema"
import { userEmailExists, userNicknameExists } from "../user/repository"
import { prisma } from "../../prisma"
import * as bcrypt from "bcrypt"

export const signUp = async (dto: SignUp): Promise<User> => {
  if (await userEmailExists(dto.email)) {
    throw new ConflictException("User email already exists")
  }

  if (await userNicknameExists(dto.username)) {
    throw new ConflictException("Username already exists")
  }

  const passwordHash = await bcrypt.hash(dto.password, 10)

  return await prisma.user.create({
    data: {
      username: dto.username,
      email: dto.email,
      password: passwordHash,
    },
  })
}
