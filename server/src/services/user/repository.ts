import { prisma } from "../../prisma"

export const userEmailExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return Boolean(user)
}

export const userNicknameExists = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  return Boolean(user)
}

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}
