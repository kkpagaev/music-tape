import { RouteOptions } from "fastify"
import { prisma } from "../prisma"

export const options: RouteOptions = {
  method: "GET",
  url: "/",
  handler: async () => {
    const users = await prisma.user.findMany()

    return users
  },
}
