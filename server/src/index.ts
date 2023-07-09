import Fastify, { FastifyInstance } from "fastify"
import * as dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import { prisma } from "./prisma"
import formBody from "@fastify/formbody"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import fp from "fastify-plugin"
import fastifyCors from "@fastify/cors"
import ws from "@fastify/websocket"

dotenv.config()

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const swaggerPlugin = fp(async (fastify: FastifyInstance) => {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      host: "localhost:3000",
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  })

  await fastify.register(swaggerUi, {
    routePrefix: "/swagger",
  })
})

async function main() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(formBody)

  await fastify.register(swaggerPlugin)

  fastify.get("/hello", async () => {
    return { hello: "world" }
  })

  const { plugin, prefix } = await import("./http")
  await fastify.register(plugin, {
    prefix,
  })

  await fastify.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })

  await fastify.register(ws, {
    logLevel: "info",
  })

  await fastify.ready()
  fastify.swagger()

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
