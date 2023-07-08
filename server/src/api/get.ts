import { RouteOptions } from "fastify"
import { prisma } from "../prisma"

export default <RouteOptions>{
  method: "GET",
  url: "/",
  handler: async () => {
    const users = await prisma.user.findMany()

    return users
  },
}
