import Fastify from "fastify"
import * as dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import { userPlugin } from "./api/users"
import { prisma } from "./prisma"

dotenv.config()

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

async function main() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(userPlugin, {
    prefix: "/users",
  })

  // Run the server!
  const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  await start()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
